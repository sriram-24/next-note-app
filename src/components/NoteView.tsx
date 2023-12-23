import { NoteViewProps } from '@/Note/notes'
import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css';
import React, { useEffect, useState } from 'react'

function NoteView({note} : NoteViewProps) {
   
  const setContent = (value:string) => {
    note?.setContent(value)
    console.log(note?.content);
    
  }

   useEffect(() =>{
    //  stores data before leaving the page.
    return ()=>{
      console.log(note?.content)
      
      fetch("/api/notes/new",{
        method:"POST",
        body:JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
      }
      }).catch(err => console.log(err)
      )
    }

   },[]) 
  return (
    <div className=' hidden md:block md:ml-64 p-4'>
        <div className='font-bold'>
            <h4>{note?.title}</h4>
        </div>
        <div className='mt-5 h-full ' key={note?.id.toString()}>
        <MdEditor  modelValue={note!.content!.toString()} onChange={setContent} preview={false} language='en-US'/>;
        </div>
    </div>
  )
}

export default NoteView