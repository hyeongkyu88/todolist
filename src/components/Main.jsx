// TodoTemplate

import React, { useState } from "react";
import TodoList from "./TodoList";
import "./Main.css";
import Input from "./Input";
import { IoSettingsSharp } from "react-icons/io5";
import TodoInsert from "./TodoInsert";
import { v4 as uuidv4 } from "uuid";
const Main = () => {
  const [selectedTodo, setSelectedTodo] = useState("바보야 최준");
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      text: "머리감기",
      checked: false,
    },
    {
      id: uuidv4(),
      text: "노트북 부시기",
      checked: true,
    },
    {
      id: uuidv4(),
      text: "키보드 샷건치기",
      checked: true,
    },
  ]);

  // 토글 함수
  const onInsertToggle = (todo) => {
    setSelectedTodo(todo);
    setInsertToggle((prev) => !prev);
  };
  //삭제 함수
  const onClickDelete = (id) => {
    setTodos((todos) => {
      return todos.filter((todo) => todo.id != id);
    });
  };

  // 체크함수
  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      })
    );
  };
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onRemove = (id) => {
    onInsertToggle();
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();

    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };
  return (
    <>
      <div className="title">오늘의 할일 {todos.length} 건</div>
      {/* <Input setTodos={setTodos} /> */}
      {/* setTodos삭제 */}
      <TodoList
        todos={todos}
        onCheckToggle={onCheckToggle}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
        selectedTodo={selectedTodo}
        onClickDelete={onClickDelete}
      />

      {/* 모달창버튼 */}
      <div className="add-todo-button" onClick={onInsertToggle}>
        {/*모달창 아이콘 */}
        <IoSettingsSharp />
      </div>
      {/* 모달창 동작 함수 */}
      {insertToggle ? (
        <TodoInsert
          onInsertToggle={onInsertToggle}
          setTodos={setTodos}
          selectedTodo={selectedTodo}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Main;
