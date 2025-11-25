import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import todoServices from "../services/todoServices";
import toast from "react-hot-toast";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newTodo, setNewTodo] = useState({
    task: "",
    description: "",
    deadline: ""
  });

  // Load user from location or localStorage
  useEffect(() => {
    if (location?.state?.user) {
      setUser(location.state.user);
    } else if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  // Fetch todos when user is available
  useEffect(() => {
    if (!user) return; //under useEffect nothing is allowed to be return (means blank return is allowed here)
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await todoServices.getTodos(user._id);
        setTodos(res.data.todos || []);
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [user]);

  // CREATE TODO
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await todoServices.postTodo({
        ...newTodo,
        createdBy: user._id,
      });
      toast.success(res.data.message);
      setTodos((todos) => [...todos, res.data.result]);
      setNewTodo({ task: "", description: "", deadline: "" });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

  // UPDATE TODO
  const handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await todoServices.updateTodo(editing._id, {
        task: editing.task,
        description: editing.description,
        status: editing.status,
        deadline: editing.deadline
      });
      toast.success(res.data.message);
      setTodos((prev) =>
        prev.map((t) =>
          t._id === editing._id ? res.data.todo : t
        )
      );
      setEditing(null); // Close edit form
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

  function toLocalInputFormat(dateString) {
    if (!dateString) return "";
    return new Date(dateString)
      .toLocaleString("sv-SE", { //sv-SE for Swedish time format YYYY-MM-DDTHH:MM
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(" ", "T");
  }


  const handleToggleStatus = async (todo) => {
    try {
      const res = await todoServices.updateTodo(todo._id, {
        task: todo.task,
        description: todo.description,
        status: !todo.status,
        deadline: todo.deadline
      });
      toast.success(res.data.message);
      setTodos((prev) =>
        prev.map((t) =>
          t._id === todo._id ? { ...t, status: !todo.status } : t
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

  // DELETE TODO
  const handleDeleteTodo = async (todoId) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const res = await todoServices.deleteTodo(todoId);
      toast.success(res.data.message);
      const filtered = todos.filter((t) => t._id !== todoId);
      setTodos(filtered);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-700">
        <p>Loading your data...</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading"
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* CREATE TODO */}
      <form
        onSubmit={handleCreateTodo}
        className="mb-6 p-4 border rounded-lg shadow-sm space-y-3">

        <h2 className="text-lg font-medium mb-2">Add New Todo</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={newTodo.task}
          onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <input
          type="datetime-local"
          value={newTodo.deadline}
          onChange={(e) => setNewTodo({ ...newTodo, deadline: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Todo
        </button>
      </form>

      {/* TODO LIST */}
      {todos.length > 0 ? (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <div key={todo._id}>
              <li
                className="p-3 mb-3 border rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <h2 className="font-medium">{todo.task}</h2>
                  <p className="text-sm text-gray-600">{todo.description}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => {
                      const formattedDeadline = toLocalInputFormat(todo.deadline);
                      setEditing({ ...todo, deadline: formattedDeadline });
                    }}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleToggleStatus(todo)}
                    className={`px-2 py-1 text-sm rounded cursor-pointer ${todo.status
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                  >
                    {todo.status ? "Completed" : "Pending"}
                  </button>

                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </li>
              {editing?._id === todo._id && (
                <form
                  onSubmit={handleEditTodo}
                  className="mb-6 p-4 border rounded-lg shadow-sm space-y-3"
                >
                  <h2 className="text-lg font-medium mb-2">Edit Todo</h2>

                  <input
                    type="text"
                    value={editing.task}
                    onChange={(e) =>
                      setEditing({ ...editing, task: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />

                  <textarea
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />

                  <input
                    type="datetime-local"
                    value={editing.deadline}
                    onChange={(e) =>
                      setEditing({ ...editing, deadline: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                  />


                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="ml-2 bg-gray-300 px-4 py-2 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p>No todos yet. Create one!</p>
      )}
    </div>
  );
}
