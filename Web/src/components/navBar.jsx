import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ doSubmit, selectChange, todos }) => {
  const [state, setState] = useState({
    inputValue: "",
  });
  const { inputValue } = state;

  const handleChange = ({ target: { name, value } }) => {
    setState({ [name]: value });
  };

  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container">
        <div>
          <Link
            to=""
            style={{ fontSize: "25px", color: "#35c999" }}
            className="navbar-brand mr-4"
          >
            <i className="fas fa-bars mr-2"></i>
            <span className="todos-title">Todos</span>
          </Link>

          <select
            className="custom-select"
            aria-label="Default select example"
            style={{ width: "80px" }}
            onChange={(e) => selectChange(e)}
            name="selectValue"
          >
            <option>old</option>
            <option value="true">New</option>
            <option value="todoTitle">Title</option>
            <option value="todoBody">Body</option>
          </select>

          <span className="ml-4" style={{ color: "#adb1b1" }}>
            You have : {todos} Todos
          </span>
        </div>
        <form
          className="form-inline d-flex "
          onSubmit={(e) => doSubmit(e, inputValue)}
        >
          <input
            onChange={handleChange}
            className="nav-input"
            type="search"
            placeholder=" Search"
            aria-label="Search"
            name="inputValue"
          />
          <button
            className="btn btn-serach"
            style={{ background: "#35c999", color: "white" }}
            type="submit"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
};
export default NavBar;
