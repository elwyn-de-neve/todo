import {useEffect, useState} from "react";
import {Pencil, ArrowBendDownLeft} from "@phosphor-icons/react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Button from "../components/Button/Button.jsx";
import formatDate from "../helpers/formatDate.js";

function Details() {
    // state voor edit-modus
    const [editMode, toggleEditMode] = useState(false);
    // state voor de data en foutmeldingen
    const [originalTodo, setOriginalTodo] = useState({});
    const [error, setError] = useState('');

    // state voor de invoervelden
    const [formState, setFormState] = useState({
        title: '',
        priority: 0,
        created: '',
        completed: false,
        description: '',
    });

    const {id} = useParams();

    function handleChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setFormState({
            ...formState,
            [changedFieldName]: newValue,
        });
    }

    useEffect(() => {
        async function fetchTodo() {
            try {
                const response = await axios.get(`http://localhost:3000/todos/${id}`);
                console.log(response.data);
                // set alles wat we hebben opgehaald in de invoervelden (hier maken we gebruik van één form-object voor alle waardes)
                setFormState({
                    ...response.data,
                    created: formatDate(response.data.created),
                });
                // sla ook de data in een apart stukje state op, zodat we altijd terug kunnen naar de originele data als de gebruiker wil annuleren
                setOriginalTodo(response.data);
            } catch (e) {
                console.error(e);
                setError('Er is iets misgegaan bij het ophalen van de taak. Ververs de pagina om het opnieuw te proberen.')
            }
        }

        // we gebruiken het woordje "void" om de eslint error te sussen
        // die denkt namelijk dat er iets terug moet komen uit deze functie, maar dat is niet zo
        void fetchTodo();
    }, []);

    async function editTodo(e) {
        e.preventDefault();
        // reset eventuele voorgaande errors
        setError('');

        try {
            console.log('de state is...', formState);
            // maak een request om de taak te wijzigen op basis van de bestaande en nieuwe data uit het formulier
            const response = await axios.put(`http://localhost:3000/todos/${id}`, formState);
            console.log('De gewijzigde todo = ', response.data);
            // Als het request gelukt is, willen we deze waardes als nieuwe 'originele' waardes gebruiken. Dus we updaten ook de todo in de state:
            setOriginalTodo(response.data);
            // Zet edit-modus uit
            toggleEditMode(false);
        } catch (e) {
            console.error(e);
            setError('De aanpassing is mislukt. Probeer het opnieuw.')
        }
    }
    //
    function cancelEdit() {
        // zet alle formulierwaardes terug naar de originele waardes;
        setFormState(originalTodo);
        // ga terug naar de read-modus ipv edit-modus
        toggleEditMode(!editMode)
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
                        name="title"
                        value={formState.title}
                        disabled={!editMode}
                        onChange={handleChange}
                    />
                </label>
                {/*Let op: de weergegeven datum is anders dan de aangeleverde datum*/}
                {/*De weergegeven datum is geformat op basis van jouw browserinstellingen (nederlands = dd-mm-yyyy) */}
                {/*maar de aangeleverde datum moet in het format yyyy-mm-dd worden aangeleverd.*/}
                <label>
                    Datum aangemaakt:
                    <input
                        type="date"
                        name="created"
                        disabled={!editMode}
                        value={formState.created}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="completed"
                        disabled={!editMode}
                        checked={formState.completed}
                        onChange={handleChange}
                    />
                    Gedaan
                </label>
                <label>
                    Prioriteit:
                    <select
                        className="priority"
                        name="priority"
                        value={formState.priority}
                        disabled={!editMode}
                        onChange={handleChange}
                    >
                        <option value={3}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={1}>High</option>
                    </select>
                </label>
                {editMode && <>
                    <button type="submit">Opslaan</button>
                    <button type="button" onClick={cancelEdit}>Annuleren</button>
                    {error && <p>{error}</p>}
                </>}
            </form>
            <Link to="/"><ArrowBendDownLeft/> Terug naar alle to-dos</Link>
        </section>
    );
}

export default Details;