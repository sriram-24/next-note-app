"use client";
import { INote } from '@/utils/notes';
import EmptyNoteView from '@/components/EmptyNoteView';
import Modal from '@/components/Modal'
import NewNote from '@/components/NewNote'
import NoteView from '@/components/NoteView';
import NotesList from '@/components/NotesList';
import { activeNote } from '@/store/store';
import { useAtom } from 'jotai';
import React, { useState } from 'react'
import {isEmpty} from 'lodash';

function HomePage() {
    const [note,setNote] = useAtom(activeNote)

    return (
        <div className='flex flex-wrap '>
            
            {/* note lists */}
            <div className='h-screen flex-grow-0 flex-shrink-0 basis-1/4 bg-secondary'>
            <NotesList  setNote={setNote} />
            </div>
            {/* opened notes */}
            {!isEmpty(note) ? <NoteView note={note} setNote={setNote} /> : <EmptyNoteView setNote={setNote}/>}
        </div>
    )
}

export default HomePage