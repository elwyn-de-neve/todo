import {ArrowDown, ArrowUp} from "@phosphor-icons/react";
import TodoItem from "../components/TodoItem/TodoItem.jsx";
import {v4 as id} from "uuid";

function Home({
                  todos,
                  setTodos,
                  inputValue,
                  setInputValue,
                  priority,
                  setPriority,
                  completed,
                  setCompleted,
                  sorted,
                  setSorted
              }) {

    // Function to add a new todo
    function addTodo(e) {
        e.preventDefault();
        if (inputValue === "") {
            // Do nothing if input is empty or consists only of whitespace
            return;
        }

        // Create a new todo object and add it to the todos array
        setTodos([...todos, {
            id: id(),
            title: inputValue,
            completed: completed,
            priority: priority,
        }]);
        setInputValue(""); // Clear the input
        setPriority(3); // Set the priority back to default
        setCompleted(false); // Set the completed back to default
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
                <button className="btn-sort" type="button" onClick={sortOnHighPriority}>High priority first <ArrowUp
                    size={16}/></button>
                : <button className="btn-sort" type="button" onClick={sortOnLowPriority}>Low priority first <ArrowDown
                    size={16}/></button>
            }
            <ol>
                {todos.map((todo) => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            todos={todos}
                            setTodos={setTodos}
                        />
                    )
                })}
            </ol>
        </>
    );
}

export default Home;