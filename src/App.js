import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/list';

function App() {
  const [state, setState] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const [toDoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((res) => setState(res)).catch(() => alert('похоже, вы не включили сервер. Включите сервер и повторите попытку'));
  }, []);

  const removeTodo = (id) => {
    axios.delete(`${API_URL + id}`);
    setState(state.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (toDoTitle) {
      setState([
        ...state,
        {
          id: Date.now(),
          title: toDoTitle,
          completed: false,
        },
      ]);
      axios.post(API_URL, {
        id: Date.now(),
        title: toDoTitle,
        completed: false,
      });
      setTodoTitle('');
    } else {
      alert('Вы ничего не ввели!');
    }
  };

  const handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      handleSubmit(ev);
    }
  };

  const toggleToDo = (id) => {
    setState(state.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        axios.patch(`${API_URL + id}`, {
          completed: todo.completed,
        });
      }
      return todo;
    }));
  };

  return (
          <div className="container" >
              <h1>Todo App</h1>

              <div className=" flex input-field">
                  <input
                      type="text"
                      value={toDoTitle}
                      onChange={(event) => setTodoTitle(event.target.value)}
                      onKeyPress={handleKeyPress}

                  />
                  <button onClick={handleSubmit} className=" btn card-panel teal lighten-2">Отправить</button>
              </div>

              <TodoList todos={state}
                        removeTodo={removeTodo}
                        toggleToDo = {toggleToDo}
                        apiUrl = {API_URL} />
          </div>

  );
}

export default App;
