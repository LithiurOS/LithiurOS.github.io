// notes.js — Simple Notes Manager using LocalStorage

export const Notes = {
    key: "notes_data",

    // Load notes array from storage
    load() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    },

    // Save entire notes array
    save(notes) {
        localStorage.setItem(this.key, JSON.stringify(notes));
    },

    // Create a new note
    add(title, content) {
        const notes = this.load();

        const newNote = {
            id: crypto.randomUUID(),
            title: title || "Untitled",
            content: content || "",
            created: Date.now(),
            updated: Date.now()
        };

        notes.push(newNote);
        this.save(notes);
        return newNote;
    },

    // Update a note by ID
    update(id, newData) {
        const notes = this.load();
        const note = notes.find(n => n.id === id);

        if (!note) return null;

        note.title = newData.title ?? note.title;
        note.content = newData.content ?? note.content;
        note.updated = Date.now();

        this.save(notes);
        return note;
    },

    // Delete by ID
    delete(id) {
        const notes = this.load().filter(n => n.id !== id);
        this.save(notes);
    },

    // Get one note
    get(id) {
        return this.load().find(n => n.id === id) || null;
    },

    // Get all notes
    list() {
        return this.load();
    },

    // Clear all
    clear() {
        localStorage.removeItem(this.key);
    }
};
