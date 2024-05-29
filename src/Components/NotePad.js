import React, { useState } from 'react';
import '../styles/NotePad.css';

const NotePad = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');

    const addNote = () => {
        if (noteText) {
            setNotes([...notes, noteText]);
            setNoteText('');
        }
    };

    const deleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    return (
        <div className="notepad">
            <h2>Note Pad</h2>
            <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write a note..."
            />
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note} <button onClick={() => deleteNote(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotePad;
