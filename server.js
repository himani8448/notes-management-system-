const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let notes = [];

// Get all notes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// Add a new note
app.post("/api/notes", (req, res) => {
    const { name, course, date, note } = req.body;

    if (!name || !course || !date || !note) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newNote = {
        id: Date.now(),
        name,
        course,
        date,
        note
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});

// Delete note
app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    res.json({ message: "Note deleted successfully" });
});

// Search by date
app.get("/api/notes/date/:date", (req, res) => {
    const date = req.params.date;
    const filtered = notes.filter(note => note.date === date);
    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
