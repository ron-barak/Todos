import { useState } from "react";
import todoService from "../services/todoService";
import $ from "jquery";

const CreateTodo = ({ setDataFromServer }) => {
  const [state, setState] = useState({
    todoTitle: "",
    todoBody: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    await todoService.createTodo(state);
    setDataFromServer();
  };

  return (
    <>
      <button
        className="btn mt-5 mb-4"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
        style={{ cursor: "pointer", background: "#35c999", color: "white" }}
      >
        Add new Todo <i className="fas fa-plus"></i>
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          style={{ marginTop: "150px" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={doSubmit}>
                <div className="form-group">
                  <input
                    autoComplete="off"
                    type="search"
                    className="form-control"
                    placeholder="Todo title"
                    onChange={handleChange}
                    name="todoTitle"
                    id="recipient-name"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="4"
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    placeholder="Todo body"
                    onChange={handleChange}
                    name="todoBody"
                    id="message-text"
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    className="btn"
                    style={{ background: "#35c999", color: "white" }}
                    onClick={() =>
                      $("#exampleModal")
                        .modal("hide")
                        .on("hidden.bs.modal", function () {
                          $(this).find("textarea, input").val("").end();
                        })
                    }
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateTodo;
