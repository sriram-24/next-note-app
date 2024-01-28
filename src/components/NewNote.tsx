import { ModalProps } from '@/utils/notes'
import React from 'react'

function NewNote({ open, onClose }: ModalProps) {
	return (
		<div className='w-100 p-4 flex flex-col'>
			<input type="text" className='border-2' />
			<button onClick={open ? onClose : () => { return }} className='bg-green-500 w-fit p-2 rounded-md self-end mt-2'>Save</button>
		</div>
	)
}

export default NewNote  