import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import NewNote from './NewNote'
import { INote, NoteViewProps } from '@/Note/notes'
import { v4 as uuidv4 } from 'uuid';
import { getAllNotes } from '@/Note/getAllNotes';
import moment from 'moment';


function NotesList({ setNote }: NoteViewProps) {
    const [noteList, setNoteList] = useState([])
    const newNote = () => {
        const note: INote = {
            id: uuidv4(),
            title: "Untitled",
            _createdDate: new Date(),
            content: "Start by typing here...",
        }
        if (setNote) {
            setNote(note)
        }
    }

    const getNoteById = (note: any) => {
        fetch(`http://localhost:3000/api/notes/${note._id}`, {
            method: "GET",
        }).then(async (note: any) => {
            let newnote = await note.json()

            if (newnote) {
                if (setNote) {
                    let note : INote = {
                        id: newnote._id,
                        title: newnote.title,
                        content : newnote.content,
                        _createdDate: newnote._createdDate
                    } 
                    setNote(note)
                }
            }
        })

    }

    useEffect(() => {
        getAllNotes().then((noteList: any) => {
            if (noteList) {
                setNoteList(noteList)
                console.log("notelist added");
                console.log(noteList);


            }

        })
    }, [])

    return (
        <div className='bg-gray-200/30 h-full fixed w-full md:w-64'>
            {/* New Note button */}
            <div className='w-full flex justify-center'>
                <button onClick={() => { newNote() }}
                    className='bg-green-500 p-2 rounded-md self-end mt-2 text-white w-36'
                >New Note</button>

            </div>
            <div className='p-2'>
                {
                    noteList.length > 0 ? noteList.map((note: any) => {
                        return (<div key={note._id} id={note._id} >
                            <div className='cursor-pointer' onClick={()=>{getNoteById(note)}}>
                                <div className='flex flex-row justify-between'>
                                <h4>{note.title}</h4>
                                <span>{moment(note._createdDate).format('DD/MM/YYYY') }</span>
                                </div>
                                <div className='overflow-hidden truncate w-60'>
                                <span className=''>{note.content}</span>
                                </div>
                            </div>
                        </div>)
                    }) : <></>
                }
            </div>
        </div>
    )
}

export default NotesList