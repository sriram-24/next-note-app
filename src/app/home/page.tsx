"use client";
import { INote } from '@/Note/notes';
import EmptyNoteView from '@/components/EmptyNoteView';
import Modal from '@/components/Modal'
import NewNote from '@/components/NewNote'
import NoteView from '@/components/NoteView';
import NotesList from '@/components/NotesList';
import React, { useState } from 'react'

function HomePage() {
    const [note,setNote] = useState(null)
    
    return (
        <div className='flex '>
            
            {/* note lists */}
            <NotesList setNote={setNote} />
            {/* opened notes */}
            {note!==null ? <NoteView note={note} setNote={setNote} /> : <EmptyNoteView />}
        </div>
    )
}

export default HomePage