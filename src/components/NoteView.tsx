import { INote, NoteViewProps } from '@/Note/notes'
import { saveNotesChanges } from '@/Note/saveChanges';
import { MdEditor } from 'md-editor-rt'
import 'md-editor-rt/lib/style.css';
import React, { useEffect, useState } from 'react'
import { Save } from 'react-feather';

function NoteView({note,setNote} : NoteViewProps) {
  
  const [content,setContent] = useState("")
  const [hasUnsavedChanges,setHasUnsavedChanges] = useState(false)

  
  const saveChanges = () => {
    console.log(note?.id);
    
    if(note?.id){
      note.content = content
      console.log(content)
      saveNotesChanges(note).then((data )=>{
        if(setNote){
          const dummy ={
            id:data._id,
            title:data.title,
            content:data.content,
            _createdDate: data._createdDate
          }
          setNote(dummy)
          setHasUnsavedChanges(false)
        }
      })
    }
  }

  useEffect(() => {
    const onBeforeUnload = (e :any) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return (
    <div className=' hidden md:block md:ml-64 p-4'>
        <div >
            <div>
              <h4 className='font-bold'>{note?.title}</h4>
              <span>{hasUnsavedChanges ? "Unsaved changes" : null}</span>
            </div>
            <div>
              <button onClick={saveChanges}>
                <Save />
              </button>
            </div>
        </div>
        <div className='mt-5 h-full ' key={note?.id?.toString()}>
        <MdEditor  modelValue={note?.content ? note.content.toString() : ""} onChange={(e)=>{setContent(e); setHasUnsavedChanges(true)}} preview={false} language='en-US'/>;
        </div>
    </div>
  )
}

export default NoteView