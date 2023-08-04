import Button from "../Button/Button.jsx";
import {Link, Trash} from "@phosphor-icons/react";
import FlagIcon from "../FlagIcon/FlagIcon.jsx";

function TodoItem({todo, todos, setTodos }) {
    const {id, title, completed, priority} = todo;

    // Function to delete a todo
    function deleteTask(id) {
        setTodos(todos.filter((todo) => todo.id !== id)) // Filter out the item with the given id and update the todos state
    }

    // Function to toggle the completed status of a todo
    function toggleCompleted(idParam) {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                const {id, completed} = todo;
                if (id === idParam) {
                    return {
                        ...todo,
                        completed: !completed,
                    };
                }
                return todo;
            })
        );
    }

    return (
        <li key={id} className="todo-item">
            <div>
                <input type="checkbox"
                       checked={completed}
                       onChange={() => toggleCompleted(id)}
                />
                <span>{title}</span>
            </div>
            <div>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={()=> console.log('Straks naar een andere pagina navigeren')}>
                    <Link size={16}/>
                </Button>
                <FlagIcon priority={priority}/>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => deleteTask(id)}>
                    <Trash size={16}/>
                </Button>
            </div>
        </li>
    );
}

export default TodoItem;