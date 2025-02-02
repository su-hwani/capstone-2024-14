import json
import os

import torch
from PIL import Image

from lib.utils.caption import Caption


class CUHKPEDESDataset(torch.utils.data.Dataset):
    def __init__(
        self,
        root,
        ann_file,
        use_onehot=True,
        max_length=100,
        transforms=None,
    ):
        self.root = root
        self.use_onehot = use_onehot
        self.max_length = max_length
        self.transforms = transforms

        self.img_dir = os.path.join(self.root, "imgs")
        # self.img_dir = self.root

        print("loading annotations into memory...")
        dataset = json.load(open(ann_file, "r"))
        self.dataset = dataset["annotations"]

    def __getitem__(self, index):
        """
        Args:
            index(int): Index
        Returns:
            tuple: (images, labels, captions)
        """
        data = self.dataset[index]

        img_path = data["file_path"]
        img = Image.open(os.path.join(self.img_dir, img_path)).convert("RGB")

        if self.use_onehot:
            caption = data["onehot"]
            caption = torch.tensor(caption)
            caption = Caption([caption], max_length=self.max_length, padded=False)
        else:
            caption = data["sentence"]
            caption = Caption(caption)

        caption.add_field("img_path", img_path)

        label = int(data["id"])

        # Convert label to string representation and then to tensor of ASCII values
        label_str = str(label)
        label_tensor = torch.tensor([ord(char) for char in label_str])
        caption.add_field("id", label_tensor)

        if self.transforms is not None:
            img = self.transforms(img)
        
        query = data["sentence"]

        return img, caption, index, query

    def __len__(self):
        return len(self.dataset)

    def get_id_info(self, index):
        image_id = self.dataset[index]["image_id"]
        pid = self.dataset[index]["id"]
        return image_id, pid
