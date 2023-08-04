import './App.css';
import {useState} from "react";
import {ArrowDown, ArrowUp, FlagPennant, Link, Trash} from "@phosphor-icons/react";
import {v4 as id} from 'uuid';
import Button from "./components/Button/Button.jsx";
import FlagIcon from "./components/FlagIcon/FlagIcon.jsx";
import TodoItem from "./components/TodoItem/TodoItem.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";

const tasks = [
    {
        id: id(),
        title: 'Learn HTML',
        completed: false,
        description: 'Learn HTML and build a simple web page',
        priority: 1
    },
    {
        id: id(),
        title: 'Learn CSS',
        completed: false,
        description: 'Learn CSS and style your web page',
        priority: 2
    },
    {
        id: id(),
        title: 'Learn JavaScript',
        completed: false,
        description: 'Learn JavaScript and make your web page interactive',
        priority: 3
    },
    {
        id: id(),
        title: 'Learn React',
        completed: false,
        description: 'Learn React and build a todo app',
        priority: 1
    }
]

function TodoDetails() {
    return null;
}

function App() {

    // Define state variables using the useState hook
    const [todos, setTodos] = useState(tasks); // Array of todos
    const [inputValue, setInputValue] = useState(""); // Input value for adding new todos
    const [priority, setPriority] = useState(3); // Priority value for adding new todos
    const [completed, setCompleted] = useState(false); // Completed value for adding new todos
    const [sorted, setSorted] = useState(true); // Sorted value for toggling priority buttons

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Home
                        todos={todos}
                        setTodos={setTodos}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        priority={priority}
                        setPriority={setPriority}
                        completed={completed}
                        setCompleted={setCompleted}
                        sorted={sorted}
                        setSorted={setSorted}
                    />}
                />
                <Route path="/todo/:id" element={<TodoDetails/>}/>
            </Routes>
        </>
    )
}

export default App