import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Input = ({ setTodos }) => {
  const [title, setTitle] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newTodo = {
      id: uuidv4(),
      text: title,
      checked: false,
    };

    setTodos((prev) => {
      return [...prev, newTodo];
    });

    setTitle("");
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <button>버튼 비활성화</button>
        <input
          placeholder="추가할 투두를 적어주세요"
          value={title}
          onChange={onChangeTitle}
        />
        <button>투두 리스트 추가하기</button>
      </form>
    </div>
  );
};

export default Input;
