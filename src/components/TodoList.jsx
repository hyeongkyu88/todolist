import React from "react";
import Todo from "./Todo";
import "./TodoList.css";

const TodoList = ({
  todos,
  onCheckToggle,
  onInsertToggle,
  onChangeSelectedTodo,
  selectedTodo,
  onClickDelete,
}) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            onCheckToggle={onCheckToggle}
            onInsertToggle={onInsertToggle}
            onChangeSelectedTodo={onChangeSelectedTodo}
            selectedTodo={selectedTodo}
            onClickDelete={onClickDelete}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
