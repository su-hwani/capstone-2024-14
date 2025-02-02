import styled from "styled-components";
import { Form, Input } from "antd";
import { UploadImage } from "./UploadImage";

/*의뢰인용 화면 - 실종자 프로필 카드 컴포넌트*/
export const ProfileCard = ({ id, profile }) => {
  const CenterInputForm = ({ label, name, lines }) => {
    return (
      <StCenterInputForm>
        <InputLabel>{label}</InputLabel>
        <InputItem name={name}>
          {lines ? (
            <MultiLineInputField
              variant="borderless"
              readOnly={true}
              autoSize={{
                minRows: 1,
                maxRows: 3,
              }}></MultiLineInputField>
          ) : (
            <InputField variant="borderless" readOnly={true} />
          )}
        </InputItem>
      </StCenterInputForm>
    );
  };
  return (
    <StProfileCard>
      <UploadImage id={id} profile={profile} />
      <CenterInputForm label={"성명"} name={"name"} />
      <CenterInputForm label={"생년월일"} name={"birth"} />
      <CenterInputForm label={"착장정보"} name={"wearingInfo"} lines={true} />
    </StProfileCard>
  );
};

const StProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60rem;
  height: 84.25rem;
  padding: 5rem;
  border-radius: 2.5rem;
  border: 0.1rem solid #e0e0e0;
  box-shadow: 0rem 0rem 1.5rem 0rem rgba(0, 88, 170, 0.2);
  /* @media (min-width: 992px) {
    width: 24rem;
    height: 33.7rem;
  } */
`;

/* 각 정보 input 영역 */
const StCenterInputForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.6rem;
`;
const InputItem = styled(Form.Item)`
  padding: 0;
  margin: 0;
`;

const InputLabel = styled.span`
  padding-bottom: 0;
  color: #00000060;
  font-size: 3rem;
`;

const InputField = styled(Input)`
  padding: 0;
  color: black;
  font-size: 4.5rem;
  font-weight: bold;
  line-height: 140%;
  margin-bottom: 0.6rem;
  text-align: center;
  text-overflow: visible;
`;

const MultiLineInputField = styled(Input.TextArea)`
  padding: 0;
  color: black;
  font-size: 3.75rem;
  font-weight: bold;
  line-height: 140%;
  margin-bottom: 0.6rem;
  text-align: center;
`;
