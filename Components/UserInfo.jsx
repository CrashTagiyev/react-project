import { useState, useContext } from "react";
import { UserApp } from "../src/App";
import styled from "styled-components";
import { Button, Form, Input, Flex, InputNumber } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};

function UserInfo({ index, id, name, email }) {
  const defaultInputValue = "";
  const { dispatch } = useContext(UserApp);
  let hideInfo = {
    display: `none`,
    color: `red`,
  };
  let showInfo = {
    display: `block`,
  };
  let showChangePanel = {
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    gap: `20px`,
  };
  let hideChangePanel = {
    display: `none`,
  };
  const [form] = Form.useForm();
  let [infoDivFlag, setInfoDivFlag] = useState(true);
  let [changeDivFlag, setChangeDivFlag] = useState(false);
  let [inputName, setInputName] = useState(name);
  let [inputMail, setInputMail] = useState(email);
  return (
    <li>
      <div style={infoDivFlag ? showInfo : hideInfo}>
        <h3>Id: {id}</h3>
        <h3>Name: {name}</h3>
        <h3>Email: {email}</h3>
        <Flex gap={10} justify="center">
          <Button
            className="user-Info-Buttons"
            onClick={() => dispatch({ type: `DELETE`, payload: id })}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setInfoDivFlag(false);
              setChangeDivFlag(true);
            }}
          >
            Change
          </Button>
        </Flex>
      </div>
      <div style={changeDivFlag ? showChangePanel : hideChangePanel}>
        <h3 style={{ width: `200px` }}>Id: {id}</h3>
        <Form
          form={form}
          onFinish={() => {
            form.resetFields();
          }}
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Flex style={{flexDirection:"column"}}>
          <Form.Item
            defaultValue=" "
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              onInput={(ev) => setInputName(ev.target.value)}
              placeholder="Name:"
              style={{ width: `200px` }}
            />
          </Form.Item>
          <Form.Item
            className="label-Color"
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input
              onInput={(ev) => setInputMail(ev.target.value)}
              placeholder="Email:"
              style={{ width: `200px` }}
              value=""
            />
          </Form.Item>
          </Flex>
        </Form>
        <Flex gap={10}>
          <Button
            onClick={() => {
              form.resetFields();
              setChangeDivFlag(false);
              setInfoDivFlag(true);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              dispatch({
                type: `CHANGE`,
                payload: { inputName, inputMail, index },
              });
              form.resetFields();
              setChangeDivFlag(false);
              setInfoDivFlag(true);
            }}
          >
            Save
          </Button>
        </Flex>
      </div>
    </li>
  );
}

export default UserInfo;
// const InfoDiv = styled.div`
//   background-color: ${(props) => props.color};
// `;

const buttonsStyle = styled.button`
  height: 30px;
`;

// const ChangeDiv = styled.div((props) => ({
//   backgroundColor: props.color,
// }));
