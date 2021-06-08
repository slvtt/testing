import { nanoid } from 'nanoid';
import TodoItem from './item';

export default function TodoList({ todos, removeTodo, toggleToDo }) {
  return (
        <ul>
            {todos.map((item) => <TodoItem removeTodo={removeTodo}
                          toggleTodo={toggleToDo}
                          key={nanoid()} {...item}
                />)}
        </ul>
  );
}
