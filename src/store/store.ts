import { INote } from "@/Note/notes";
import { Getter, Setter, atom, createStore } from "jotai";
import { v4 as uuidv4 } from 'uuid';

//  creating jotai store
export const notesStore = createStore()

// const defaultNote : INote = {
//     id: uuidv4(),
//     title: "Untitled",
//     _createdDate: new Date(),
//     content: "Start by typing here...",
// }

// creating active note
const note = atom<INote>({})

export const activeNote = atom(
    (get) => get(note),
    (_get,set,newNote : INote) => set(note,newNote)
)


// setting the active note to notes store
notesStore.set(activeNote,{});