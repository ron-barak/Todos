import { useState } from "react";
import todoService from "../services/todoService";
import Todo from "./todo";
import CreateTodo from "./createTodo";

const TodoContainer = ({ todos, setDataFromServer }) => {
  const [todoState, setTodoState] = useState({
    todoBody: "",
  });
  const [buttonState, setButtonState] = useState({
    isAboutVisible: false,
    _id: "",
  });

  //----DELETE---//
  const handleDelete = async (_id) => {
    await todoService.deleteTodo(_id);
    setDataFromServer();
  };

  //----UPDATE----//
  const handleUpdate = async ({ target: { name, value } }, _id) => {
    setButtonState({ isAboutVisible: true, _id });
    setTodoState({ ...todoState, [name]: value, _id });
  };

  const doUpdateSubmit = async (e) => {
    e.preventDefault();
    setButtonState({ isAboutVisible: false });
    await todoService.editTodo(todoState);
  };

  return (
    <>
      <CreateTodo setDataFromServer={setDataFromServer} />
      <div className="row">
        <Todo
          todos={todos}
          handleDelete={handleDelete}
          doUpdateSubmit={doUpdateSubmit}
          handleUpdate={handleUpdate}
          buttonState={buttonState}
        />
      </div>
    </>
  );
};
export default TodoContainer;
