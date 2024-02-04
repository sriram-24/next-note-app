import { getAllNotes } from "@/utils/getAllNotes";
import { INote } from "@/utils/notes";
import { Getter, Setter, atom, createStore } from "jotai";
import { isEmpty } from "lodash";
import { v4 as uuidv4 } from 'uuid';

//  creating jotai store
export const notesStore = createStore()

// creating active note
const note = atom<INote>({})

export const activeNote = atom(
    (get) => get(note),
    (_get,set,newNote : INote) => set(note,newNote)
)

// notes list

const notes = atom<Array<INote>>([])

export const notesList = atom(
    (get) => get(notes),
    async (_get,set,isRefresh : boolean,newNotesList : any) => {
            if(isRefresh){
                getAllNotes().then((noteList: any) => {
                    if (noteList) {
                        set(notes,noteList)
                    }
        
                })
            }
            if(!isEmpty(newNotesList)){
                set(notes,newNotesList)
            }
    }
)


// setting the active note to notes store
notesStore.set(activeNote,{});
notesStore.set(notesList,true,[])