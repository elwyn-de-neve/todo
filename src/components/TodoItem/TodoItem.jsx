import Button from "../Button/Button.jsx";
import {Link, Trash} from "@phosphor-icons/react";
import FlagIcon from "../FlagIcon/FlagIcon.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function TodoItem({todo: {id, title, completed, priority}, toggleTask, toggleCompleted }) {
    const navigate = useNavigate();

    return (
        <li key={id} className="todo-item" >
            <div>
                <input type="checkbox"
                       checked={completed}
                       onChange={() => toggleTask(id)}
                />
                <span>{title}</span>
            </div>
            <div>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(`/todo/${id}`)}>
                    <Link size={16}/>
                </Button>
                <FlagIcon priority={priority}/>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => toggleCompleted(id)}>
                    <Trash size={16}/>
                </Button>
            </div>
        </li>
    );
}

export default TodoItem;