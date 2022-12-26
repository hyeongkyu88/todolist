import React, { useEffect, useState } from "react";
import "./TodoInsert.css";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import axios from "axios";
const TodoInsert = ({
  onInsertToggle,
  setTodos,
  selectedTodo,
  onRemove,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // uuid는 제거, id는 서버에서 자동으로 생성
    const newTodo = {
      text: title,
      checked: false,
    };

    axios
      .post("http://localhost:3001/todo", newTodo)
      .then((response) => {
        console.log("todo 생성 완료", response.data.id);
        // 생성된 데이터를 setTodos를 이용해 todos에 저장
        setTodos((prev) => {
          return [...prev, response.data];
        });
      })
      .catch((error) => {
        console.log(error);
      });

    onInsertToggle();
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  // selectedTodo
  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <>
      <div className="background" onClick={onInsertToggle}>
        background
      </div>
      <form
        onSubmit={
          selectedTodo
            ? () => onUpdate(selectedTodo.id, title)
            : onSubmitHandler
        }
      >
        <input
          placeholder="TODO를 입력해주세요"
          value={title}
          onChange={onChangeTitle}
        />
        {selectedTodo ? ( //onUpdate(selectedTodo.text)로 되어있었는데 수정함
          <div className="rewrite">
            <TiPencil onClick={() => onUpdate(selectedTodo.id, title)} />
            <TiTrash
              onClick={() => {
                onRemove(selectedTodo.id);
              }}
            />
          </div>
        ) : (
          <button type="submit">
            <MdAddCircle />
          </button>
        )}
      </form>
    </>
  );
};

export default TodoInsert;
