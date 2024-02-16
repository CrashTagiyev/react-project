import { useContext, useState } from "react";
import { UserApp } from "../src/App";
import UserInfo from "./UserInfo";
import { Button, Flex } from 'antd';
function Main() {
  let [inputName, setinputName] = useState(``);
  let [inputEmail, setInputEmail] = useState(``);
  const { array, dispatch } = useContext(UserApp);
  return (
    <>
      <div style={{ display: `flex`, flexdirection: `row`, gap: `20px` }}>
        <input
          required
          type="text"
          onInput={(ev) => setinputName(ev.target.value)}
          placeholder="Name"
        />
        <input
          required
          type="text"
          onInput={(ev) => setInputEmail(ev.target.value)}
          placeholder="Email"
        />
      </div>
      <button
        onClick={() =>
          dispatch({ type: `ADD`, payload: { inputName, inputEmail } })
        }
      >
        addNew
      </button>
      <ul>
        {array.array.map((element, index) => (
          <UserInfo index={index} key={element.id} {...element} />
        ))}
      </ul>
    </>
  );
}

export default Main;
