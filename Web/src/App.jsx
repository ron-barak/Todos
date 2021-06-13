import "./App.css";
import NavBar from "./components/navBar";
import TodoContainer from "./components/todoContainer";
import { useEffect, useState } from "react";
import todoService from "./services/todoService";

const App = () => {
  const [state, setState] = useState({
    todos: [],
  });

  //----RENDER ALL TODOS----//
  const setDataFromServer = async () => {
    let todos = await todoService.getAll();
    setState({ todos });
  };
  useEffect(() => {
    setDataFromServer();
  }, []);

  const doSearchSubmit = async (e, val) => {
    e.preventDefault();
    let data = await todoService.searchValue(val);
    !data.length ? alert("No results") : setState({ todos: data });
  };

  const selectChange = async ({ target: { value } }) => {
    let todos = await todoService.orderBy(value);
    setState({ todos });
  };

  const { todos } = state;
  return (
    <div className="App">
      <header>
        <NavBar
          todos={todos.length}
          doSubmit={doSearchSubmit}
          selectChange={selectChange}
        />
      </header>
      <main className="container">
        <TodoContainer todos={todos} setDataFromServer={setDataFromServer} />
      </main>
    </div>
  );
};

export default App;
