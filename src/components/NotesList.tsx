import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import NewNote from './NewNote'
import { INote, NoteViewProps } from '@/utils/notes'
import { v4 as uuidv4 } from 'uuid';
import { getAllNotes } from '@/utils/getAllNotes';
import moment from 'moment';
import { useAtom } from 'jotai';
import { notesList, activeNote } from '@/store/store';
import { Edit, Plus, Search } from 'react-feather';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';


function NotesList({ setNote }: NoteViewProps) {
    const [noteList, setNoteList] = useAtom(notesList)
    const [currentNote] = useAtom(activeNote)
    console.log(currentNote);
    
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
        fetch(`/api/notes/${note._id}`, {
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
                    console.log(note);
                    
                    setNote(note)
                }
            }
        })

    }

    useEffect(() => {
        setNoteList(true);
    }, [])

    return (
        <div className='bg-surface p-2 h-screen flex-grow-0 flex-shrink-0 basis-1/4'>
            {/* New Note button */}
            <div className='h-[15%] mt-2'>
            <div className='flex justify-center'>
                <div className="seach-box relative ">
                    <div className='absolute mt-2 ml-2 text-gray-300'>
                    <Search/>
                    </div>
                    <input type="text" placeholder='Search here' className='pl-12 pt-2 pb-2 pr-2 rounded-full'/>
                </div>
            </div>
            <div className='flex justify-between my-4 p-2'>
                <div>
                    <h4 className='font-bold text-lg'>My Notes</h4>
                </div>
                <div className='flex justify-center'>
                    <button onClick={() => { newNote() }}
                        className=' '
                    >
                        <Edit size={18}/>
                    </button>
                </div>
            </div>
            </div>
            <div className='h-[85%] overflow-y-scroll p-2 scroll-'>
                {
                    
                    noteList.length > 0 ? noteList.map((note: any) => {
                        return (
                            <Card id={note._id} key={note._id}  className={`cursor-pointer ${note._id === currentNote.id ? "bg-secondary/90 text-white":""}`} onClick={()=>{getNoteById(note)}}>
                                <CardHeader>
                                    <CardTitle>{note.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                        <div>
                                            {note.content}
                                        </div>
                                </CardContent>
                            </Card>
                           
                            
                        )
                    }) : <></>
                }
            </div>
        </div>
    )
}

export default NotesList