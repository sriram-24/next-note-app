import { previewMode } from '@/store/store';
import { INote, NoteViewProps } from '@/utils/notes'
import { useAtom } from 'jotai';
import Image from 'next/image'
import React from 'react'
import { PlusCircle } from 'react-feather'
import { v4 as uuidv4 } from 'uuid';

function EmptyNoteView({setNote}: NoteViewProps) {
	const [isPreview, setPreviewMode] = useAtom(previewMode)

	const newNote = () => {
        const note: INote = {
            id: uuidv4(),
            title: "Untitled",
            _createdDate: new Date(),
            content: "Start by typing here...",
        }
        if (setNote) {
            setNote(note)
            setPreviewMode(false)
        }
    }

	return (
		<div className=' hidden md:block flex-grow-0 flex-shrink-0 basis-3/4 bg-surface-background/20'>
			<div className='flex items-center justify-center h-full flex-col'>
				<Image 
					src={"nodata.svg"} 
					alt={'empty note'}	
					width={300}
					height={300}		
				/>
				<span className='mt-4'>Start by creating new note or opening an existing note.</span>
				<button className='flex mt-6 text-primary' onClick={()=>{
					newNote()
				}}>
					<PlusCircle />
					<span className='ml-4 font-bold'>New Note</span>
				</button>
			</div>
		</div>
	)
}

export default EmptyNoteView