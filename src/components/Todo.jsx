import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

// import { TfiCheck, TfiCheckBox } from "react-icons/tfi";

import "./Todo.css";
const Todo = ({
  todo,
  onCheckToggle,
  onInsertToggle,
  onClickDelete,
  onChangeSelectedTodo,
}) => {
  const { text, checked, id } = todo;

  return (
    <div className="Todo">
      {/* content라는 클래스도 넣을거고, 조건에 따라서 checked도 추가 할꺼임 */}
      <div className={`content ${checked ? "checked" : ""}`}>
        {checked ? (
          <MdCheckBox
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        )}
        <div
          className="text"
          onClick={() => {
            onChangeSelectedTodo(todo);

            onInsertToggle();
          }}
        >
          {" "}
          {text}
        </div>
        <button onClick={() => onInsertToggle(todo)}>수정</button>
        <button onClick={() => onClickDelete(id)}>삭제</button>
      </div>
    </div>
  );
};

export default Todo;
