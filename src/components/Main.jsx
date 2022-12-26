// TodoTemplate

import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import "./Main.css";
import Input from "./Input";
import { IoSettingsSharp } from "react-icons/io5";
import TodoInsert from "./TodoInsert";
import axios from "axios";

const Main = () => {
  const [selectedTodo, setSelectedTodo] = useState("");
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([]);

  // useEffect: 켜졌을 때 실행되는 함수를 적어놓는 곳
  // getTodos는 화면이 켜지자마자 실행되야 하므로 useEffect에 넣음
  useEffect(() => {
    getTodos();
  }, []);
  // json-server를 이용하여 api서버를 구현 후 (url: http://localhost:3001)
  // db.json이 있는 경로에 json-server db.json --port 3001 --watch 실행
  // axios를 사용하여 db.json에 연결
  function getTodos() {
    axios
      .get("http://localhost:3001/todo")
      .then((response) => {
        // http://localhost:3001/todo에서 받은 데이터를 setTodos를 사용하여 todos 넣음
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // api를 사용하여 id에 해당하는 데이터를 삭제
  function deleteTodos(id) {
    axios
      .delete("http://localhost:3001/todo/" + id)
      .then((response) => {
        console.log("todo 삭제 완료", id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // api를 사용하여 checked 저장
  function checkTodo(id, checked) {
    axios
      .patch("http://localhost:3001/todo/" + id, { checked: checked })
      .then((response) => {
        console.log("todo 수정 완료", id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // api를 사용하여 텍스트 저장
  function textTodo(id, text) {
    axios
      .patch("http://localhost:3001/todo/" + id, { text: text })
      .then((response) => {
        console.log("todo 수정 완료", id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // 토글 함수 setSelectedTodo()초기화 되는거 수정
  const onInsertToggle = (todo) => {
    if (todo != undefined) {
      if (!insertToggle) {
        if (todo.hasOwnProperty("id")) {
          setSelectedTodo(todo);
        } else {
          setSelectedTodo(null);
        }
      }
    }
    setInsertToggle((prev) => !prev);
  };
  //삭제 함수
  const onClickDelete = (id) => {
    deleteTodos(id);

    setTodos((todos) => {
      return todos.filter((todo) => todo.id != id);
    });
  };

  // 체크함수
  const onCheckToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id == id) {
          // api를 불러서 checked 토글 저장
          checkTodo(id, !todo.checked);
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      })
    );
  };
  //sesetSelectedTodo 수정
  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const onRemove = (id) => {
    onInsertToggle();
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle();
    textTodo(id, text);

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
