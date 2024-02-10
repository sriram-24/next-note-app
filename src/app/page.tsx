"use client"
import { notesStore } from '@/store/store'
import { Provider } from 'jotai'
import HomePage from './home/page'

export default function Home() {

	return (
		<Provider store={notesStore}>
			<HomePage  />
		</Provider>
		
	)
}
