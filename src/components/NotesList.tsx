import React, { useState } from 'react'
import Modal from './Modal'
import NewNote from './NewNote'
import { NoteViewProps } from '@/Note/notes'
import Note from '@/Note/Note'

function NotesList({ setNote }: NoteViewProps) {
    const [open, setOpen] = useState(false)
    const newNote = () => {
        if(setNote){
            setNote(new Note())
        }
    }
    return (
        <div className='bg-gray-200/30 h-full fixed w-full md:w-64'>
            {/* New Note button */}
            <div className='w-full flex justify-center'>
                <button onClick={() => { newNote() }}
                    className='bg-green-500 p-2 rounded-md self-end mt-2 text-white w-36'
                >New Note</button>

            </div>
        </div>
    )
}

export default NotesList