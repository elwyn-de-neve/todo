import {Link, useParams} from "react-router-dom";
import Button from "../components/Button/Button.jsx";
import {Pencil, ArrowBendDownLeft} from "@phosphor-icons/react";
import {useState} from "react";

function Details() {
    // state voor edit-modus
    const [editMode, toggleEditMode] = useState(false);
    // state voor de invoervelden
    const [inputValue, setInputValue] = useState("Lorem ipsum dolor sit");
    const [priority, setPriority] = useState(3);
    const [createdValue, setCreatedValue] = useState('*denkbeeldige datum*');
    const [completedValue, toggleCompletedValue] = useState(true);
    const {id} = useParams();

    function editTodo(e) {
        e.preventDefault();
        // hier wachten we nog even mee!
    }

    return (
        <section className="tab-section">
            <h1>Details</h1>
            <span className="detail-header-container">
                <code>{id}</code>
                {!editMode && <Button type="button" variant="tertiary"
                                      onClick={() => toggleEditMode(!editMode)}><Pencil/>Edit</Button>}
            </span>
            <form className={editMode ? 'form-edit-mode' : 'form-read-mode'} onSubmit={editTodo}>
                <label>
                    Titel:
                    <input
                        type="text"
                        value={inputValue}
                        disabled={!editMode}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </label>
                <label>
                    Datum aangemaakt:
                    <input
                        type="date"
                        disabled={!editMode}
                        value={createdValue}
                        onChange={e => setCreatedValue(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        disabled={!editMode}
                        checked={completedValue}
                        onChange={() => toggleCompletedValue(!completedValue)}
                    />
                    Gedaan
                </label>
                <label>
                    Prioriteit:
                    <select
                        className="priority"
                        value={priority}
                        disabled={!editMode}
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value={3}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={1}>High</option>
                    </select>
                </label>
                {editMode && <>
                    <button type="submit">Edit</button>
                    <button type="button" onClick={() => toggleEditMode(!editMode)}>Annuleren</button>
                </>}
            </form>
            <Link to="/"><ArrowBendDownLeft /> Terug naar alle to-dos</Link>
        </section>
    );
}

export default Details;