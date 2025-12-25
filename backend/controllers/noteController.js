import Note from "../notes/notes.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find()
        console.log(`Fetched ${notes.length} notes from DB`)
        res.status(200).json(notes)

    } catch (error) {
        console.log("Error getting notes..")
        res.status(500).json({ message: "Internal Server Error.." })
    }
}

export async function getNote(req, res) {
    try {

        const n = await Note.findById(req.params.id)
        res.status(200).json(n)
    } catch (error) {
        console.log("Error getting the note..")
        res.status(500).json({ message: "Internal Server Error...." })
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content })
        await newNote.save()
        res.status(201).json({ message: "note created ! " })

    } catch (error) {
        res.status(500).json({ message: "error creating note ..." })
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true })

        if (!updatedNote) return res.status(404).json({ message: "Error updating the note..." })
        res.status(200).json(updatedNote)

    } catch (error) {
        res.status(500).json({ message: "Error updating the note" })
    }
}
export async function deleteNote(req, res) {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if (deletedNote) return res.status(201).json({ message: "note deleted successfully.." })

}
