import { nanoid } from 'nanoid';
import TodoItem from './item';

export default function TodoList({
                                     todos, removeTodo, toggleToDo, apiUrl,
}) {
  return (
        <ul>
            {todos.map((item) => <TodoItem
                removeTodo = {removeTodo}
                toggleTodo = {toggleToDo}
                apiURl = {apiUrl}
                key = {nanoid()}
                {...item}
                />)}
        </ul>
  );
}
