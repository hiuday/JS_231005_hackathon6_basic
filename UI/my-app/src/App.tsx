import React, { useEffect, useState } from "react";
import "./App.css";
import { CiCirclePlus } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import baseAxios from "./api/baseAxios";
function App() {
  const [data, setData] = useState<any[]>([]);
  const [sort, setSort] = useState<string>("");
  const [formCreate, setFormCreate] = useState({
    content: "",
  });
  //ok

  const handleGetData = async () => {
    if (sort === "") {
      const result = await baseAxios.get(`/`);
      setData(result.data);
    } else {
      const result = await baseAxios.get(`/todo/?sort=${sort}`);
      setData(result.data);
    }
  };
  useEffect(() => {
    handleGetData();
  }, [sort]);
  const handleChangeFormCreate = (e: any) => {
    const { content, value } = e.target;
    setFormCreate({
      ...formCreate,
      [content]: value,
    });
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      await baseAxios.post("/todo", formCreate);
      setFormCreate({
        content: "",
      });
      handleGetData();
    } catch (error) {
      console.log(error);
      alert("lỗi");
    }
  };
  const handleDelete = async (id: number) => {
    await baseAxios.delete(`/todo/delete/${id}`);
    handleGetData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            color: "white",
            background: "orange",
            padding: "20px 0 20px 20px",
            font: "15px",
            fontWeight: "500",
          }}
        >
          Note App
        </h1>
      </header>
      <main className="todolist">
        <div className="container">
          <div className="todo-add" onSubmit={() => handleSubmitForm}>
            <p
              style={{
                color: "grey",
              }}
            >
              title
            </p>
            <input
              onChange={handleChangeFormCreate}
              value={formCreate.content}
              className="input-add"
              type="text"
              placeholder="nhập task"
            />

            <button
              onClick={() => {
                setFormCreate({
                  content: "",
                });
              }}
              className="icon"
            >
              <CiCirclePlus
                style={{
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
          <div className="content">
            {data.map((data) => (
              <div className="todo-content">
                <p
                  style={{
                    color: "grey",
                  }}
                >
                  {data.content}
                </p>
                <button
                  style={{
                    marginLeft: "200px",
                  }}
                >
                  <FaTrash
                    onClick={() => handleDelete}
                    style={{
                      color: "orange",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
