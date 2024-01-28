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
        <div className='flex '>
            
            {/* note lists */}
            <NotesList setNote={setNote} />
            {/* opened notes */}
            {!isEmpty(note) ? <NoteView note={note} setNote={setNote} /> : <EmptyNoteView />}
        </div>
    )
}

export default HomePage