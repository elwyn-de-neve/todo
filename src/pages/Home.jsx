import {ArrowDown, ArrowUp} from "@phosphor-icons/react";
import TodoItem from "../components/TodoItem/TodoItem.jsx";
import {v4 as id} from "uuid";
import {useEffect, useState} from "react";
import axios from "axios";

// const tasks = [
//     {
//         id: id(),
//         title: 'Learn HTML',
//         completed: false,
//         description: 'Learn HTML and build a simple web page',
//         priority: 1
//     },
//     {
//         id: id(),
//         title: 'Learn CSS',
//         completed: false,
//         description: 'Learn CSS and style your web page',
//         priority: 2
//     },
//     {
//         id: id(),
//         title: 'Learn JavaScript',
//         completed: false,
//         description: 'Learn JavaScript and make your web page interactive',
//         priority: 3
//     },
//     {
//         id: id(),
//         title: 'Learn React',
//         completed: false,
//         description: 'Learn React and build a todo app',
//         priority: 1
//     }
// ]

function Home() {
    // Define state variables using the useState hook
    const [todos, setTodos] = useState([]); // Array of todos
    const [inputValue, setInputValue] = useState(""); // Input value for adding new todos
    const [priority, setPriority] = useState(3); // Priority value for adding new todos
    const [completed, setCompleted] = useState(false); // Completed value for adding new todos
    const [sorted, setSorted] = useState(true); // Sorted value for toggling priority buttons
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchTodos() {
            try {
                const response = await axios.get('http://localhost:3000/todos');
                console.log(response.data);
                setTodos(response.data);
            } catch(e) {
                console.error(e);
                setError('Er is iets misgegaan bij het ophalen van de taken. Ververs de pagina en probeer het opnieuw.');
            }
        }

        fetchTodos();
    }, []);

    // Function to add a new todo
    async function addTodo(e) {
        e.preventDefault();
        // reset eventuele voorgaande errors
        setError('');

        if (inputValue === "") {
            // Do nothing if input is empty or consists only of whitespace
            return;
        }

        try {
            // Post de nieuwe todo in de database
            const response = await axios.post('http://localhost:3000/todos', {
                id: id(),
                title: inputValue,
                completed: completed,
                priority: priority,
                created: new Date(),
            });
            console.log('De nieuwe geposte todo = ', response.data);

            // als dat gelukt is, posten we deze todo ook in de state;
            setTodos([
                ...todos,
                response.data,
            ]);
        } catch(e) {
            console.error(e);
            setError('Het toevoegen van de taak is mislukt. Probeer het opnieuw.');
        } finally {
            // rest alle form-elementen
            setInputValue(""); // Clear the input
            setPriority(3); // Set the priority back to default
            setCompleted(false); // Set the completed back to default
        }
    }


    // Function to sort todos based on a given comparator function
    function sortTodos(comparator) {
        const sortedTodos = [...todos];
        sortedTodos.sort(comparator);
        setTodos(sortedTodos);
    }

    // Function to sort todos based on high priority
    function sortOnHighPriority() {
        sortTodos((a, b) => a.priority - b.priority);
        setSorted(false);
    }

// Function to sort todos based on low priority
    function sortOnLowPriority() {
        sortTodos((a, b) => b.priority - a.priority);
        setSorted(true);
    }

    // Function to delete a todo
    async function deleteTask(id) {
        // reset eventuele voorgaande errors
        setError('');

        try {
            // Verwijder todo uit database
            const response = await axios.delete(`http://localhost:3000/todos/${id}`);
            console.log('deleted post ', response.statusText);
            // Verwijder vervolgens de todo ook uit de state
            setTodos(todos.filter((todo) => todo.id !== id))
        } catch(e) {
            console.error(e);
            setError('Het verwijderen van de taak is mislukt. Probeer het opnieuw');
        }
    }

    // Function to toggle the completed status of a todo
    async function toggleTask(id) {
        // reset eventuele voorgaande errors
        setError('');

        // zoek eerst alle informatie van deze specifieke todo
        const todoInfo = todos.find((todo) => todo.id === id);
        // pas de completed-key aan, zodat we dit object naar de backend kunnen sturen
        todoInfo.completed = !todoInfo.completed;

        try {
            const response = await axios.put(`http://localhost:3000/todos/${id}`, todoInfo);
            console.log('De gewijzigde todo = ', response.data);

            // als dat gelukt is, passen we deze todo ook in de state aan;
            setTodos((prevTodos) =>
                prevTodos.map((todo) => {
                    if (id === todo.id) {
                        return response.data;
                    }
                    return todo;
                })
            );
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Todo App</h1>
            <form className="form" onSubmit={addTodo}>
                <input
                    type="text"
                    placeholder="Title"
                    value={inputValue} // Control the value with state
                    onChange={e => setInputValue(e.target.value)} // Update state on input change
                />
                <select
                    className="priority"
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value={3}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={1}>High</option>
                </select>
                <button type="submit">Add</button>
            </form>
            {sorted ?
                <button className="btn-sort" type="button" onClick={sortOnHighPriority}>
                    High priority first <ArrowUp size={16}/>
                </button>
                : <button className="btn-sort" type="button" onClick={sortOnLowPriority}>
                    Low priority first <ArrowDown size={16}/>
                </button>
            }
            <ol>
                {todos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleTask={toggleTask}
                            deleteTask={deleteTask}
                        />
                    )
                })}
            </ol>
        </>
    );
}

export default Home;