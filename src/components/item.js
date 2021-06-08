import { useState } from 'react';
import { FormControlLabel, Checkbox, Container } from '@material-ui/core';
import axios from 'axios';

export default function TodoItem({
  title, id, completed, removeTodo, toggleTodo,
}) {
  const [checked] = useState(completed);
  const [text, setText] = useState(title);
  const [newText, setNewText] = useState(text);

  const [edit, setEdit] = useState(null);

  const editToDo = (editId) => {
    setEdit(editId);
  };

  const saveNewToDo = (newId) => {
    if (newId === id) {
        title = text;
    }
    setNewText(text);
    setEdit(null);

      axios.patch(`http://localhost:8000/state/${id}`, {
          title: text,
      });
  };

  return (
        <li className="list__item" >
            <Container>
                <div className="container_for_item">
                    <div className="items">
                        <FormControlLabel
                            control={<Checkbox checked={checked}
                                               onChange={ () => toggleTodo(id) } />} />
                        {
                            edit === id ? <input value={text}
                                                 onChange={
                                                     (e) => setText(e.target.value)}/>
                                : <span onClick={() => editToDo(id)}>{newText}</span>
                        }
                    </div>
                    {
                        edit === id ? <button onClick={() => saveNewToDo(id)}>Save</button>
                            : <button
                                className="material-icons red-text button"
                                onClick={ () => removeTodo(id) }
                            >
                                delete
                            </button>
                    }

                </div>
            </Container>
        </li>

  );
}
