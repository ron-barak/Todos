import todoService from "../services/todoService";
const Todo = ({
  todos,
  handleDelete,
  doUpdateSubmit,
  handleUpdate,
  buttonState: { _id, isAboutVisible },
}) => {
  return (
    <>
      {todos.map((item, index) => {
        return (
          <div key={item._id} className="col-lg-6">
            <div className="list-group mb-3 bg-white shadow ">
              <div className="list-group-item list-group-item-action  ">
                <div className="row align-items-center p-1">
                  <div className="col-lg-1 "></div>
                  <div
                    className="col-lg-10 py-2"
                    style={{
                      borderLeft: "2px solid pink",
                    }}
                  >
                    <small style={{ color: "#adb1b1" }}>
                      {todoService.timeConvert(
                        Math.ceil(
                          (Date.now() - new Date(item.createdAt)) / 1000 / 60
                        )
                      )}
                      ago
                    </small>
                    <h5 style={{ color: "#35c999" }}>
                      {index + 1} <i className="fas fa-hashtag"></i>{" "}
                      {item.todoTitle}
                    </h5>
                    <form onSubmit={doUpdateSubmit}>
                      <textarea
                        defaultValue={item.todoBody}
                        onChange={(e) => handleUpdate(e, item._id)}
                        name="todoBody"
                        rows="2"
                      ></textarea>
                      <br />
                      {isAboutVisible && item._id === _id ? (
                        <button className="btn-sm btn-dark">Save</button>
                      ) : null}
                    </form>
                  </div>
                  <i
                    className="fas fa-minus-circle col-lg-1 p-1"
                    onClick={() => handleDelete(item._id)}
                    style={{
                      color: "#dc3545",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Todo;
