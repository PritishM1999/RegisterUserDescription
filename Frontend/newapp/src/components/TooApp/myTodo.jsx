import React, { useEffect, useState } from "react";
import "./todo.css";

function MyTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const changeStatus = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === id).completed
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      });
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div className="todo-card" key={todo.id}>
          <h3>{todo.id}</h3>
          <p>{todo.title}</p>
          <p onClick={() => changeStatus(todo.id)}>{String(todo.completed)}</p>
        </div>
      ))}
    </div>
  );
}

export default MyTodo;

// import React, { useEffect, useState } from "react";
// import "./todo.css";

// function MyTodo() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((res) => res.json())
//       .then((data) => setTodos(data));
//   }, []);

//   const changeStatus = (e) => {
//     fetch(`https://jsonplaceholder.typicode.com/todos/${todos.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(e)
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setTodos((...prev) => {
//           prev.map((todo) =>
//             todo.completed === true
//               ? (data.completed = "false")
//               : (todo.completed = "true")
//           );
//         });
//       });
//   };

//   return (
//     <div className="todo-list">
//       {todos.map((todo) => (
//         <div className="todo-card" key={todo.id}>
//           <h3>{todo.id}</h3>
//           <p>{todo.title}</p>
//           <p
//             onClick={(e) => {
//               changeStatus(todo);
//             }}
//           >
//             {String(todo.completed)}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MyTodo;
