import Image from 'next/image'
import React from 'react'
import { PlusCircle } from 'react-feather'

function EmptyNoteView() {
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
				<button className='flex mt-6 text-primary'>
					<PlusCircle />
					<span className='ml-4 font-bold'>New Note</span>
				</button>
			</div>
		</div>
	)
}

export default EmptyNoteView