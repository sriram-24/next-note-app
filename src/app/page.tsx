"use client"
import LeftNavigation from '@/components/LeftNavigation'
import Modal from '@/components/Modal'
import NewNote from '@/components/NewNote'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import HomePage from './home/page'
import { Provider } from 'jotai'
import { notesStore } from '@/store/store'

export default function Home() {

	return (
		<Provider store={notesStore}>
			<HomePage  />
		</Provider>
		
	)
}
