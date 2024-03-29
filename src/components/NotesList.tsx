import { activeNote, notesList, previewMode } from '@/store/store';
import { getNotesBySearchTerm } from '@/utils/getAllNotes';
import { INote, NoteViewProps } from '@/utils/notes';
import { useAtom } from 'jotai';
import { debounce, orderBy } from 'lodash';
import { useEffect, useState } from 'react';
import { PlusCircle, Search, Trash } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';


function NotesList({ setNote }: NoteViewProps) {
    const [noteList, setNoteList] = useAtom(notesList)
    const [currentNote] = useAtom(activeNote)
    const [isPreview, setPreviewMode] = useAtom(previewMode)
    const [searchTerm, setSearchTerm] = useState("");

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

    const getNoteById = (note: any) => {
        fetch(`/api/notes/${note._id}`, {
            method: "GET",
        }).then(async (note: any) => {
            let newnote = await note.json()

            if (newnote) {
                if (setNote) {
                    let note: INote = {
                        id: newnote._id,
                        title: newnote.title,
                        content: newnote.content,
                        _createdDate: newnote._createdDate
                    }
                    setNote(note)
                    setPreviewMode(true)
                }
            }
        })

    }



    const onChangeSerach = (e: any) => {
        setSearchTerm(e.target.value);
        getNotesBySearchTerm(e.target.value).then((newNotesList) => {
            setNoteList(false, newNotesList)
        })
    }

    const searchNotes = debounce(onChangeSerach, 1000)

    useEffect(() => {
        setNoteList(true, null);
    }, [])

    return (
        <div className='bg-surface-light p-2 h-screen rounded-s-[30px] '>
            {/* New Note button */}
            <div className='h-[15%] mt-2'>
                <div className='flex justify-center'>
                    <div className="seach-box relative ">
                        <div className='absolute mt-2 ml-2 text-gray-300'>
                            <Search />
                        </div>
                        <input type="text"
                            placeholder='Search here'
                            className='pl-12 pt-2 pb-2 pr-2 rounded-full focus:outline-1 focus:outline-secondary/30'

                            onChange={searchNotes}
                        />
                    </div>
                </div>
                <div className='flex justify-between my-4 p-2'>
                    <div>
                        <h4 className='font-bold text-lg'>My Notes</h4>
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={() => { newNote() }}
                            className=' '
                        >
                            <PlusCircle size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-[85%] pb-8'>
                <div className='h-full overflow-y-auto snap-y pr-2' >
                    {

                        noteList.length > 0 ? orderBy(noteList,["_createdDate"],["desc"]).map((note: any) => {
                            return (
                                <Card id={note._id} key={note._id}
                                    className={
                                        `cursor-pointer max-h-32 overflow-hidden snap-start max-w-[300px]
                                        ${note._id === currentNote.id ? "bg-secondary text-white" : ""}`
                                    }
                                    onClick={() => { getNoteById(note) }}
                                >
                                    <CardHeader className='flex justify-between'>
                                        <CardTitle>{note.title}</CardTitle>
                                        
                                    </CardHeader>
                                    <CardContent>
                                        <p className='line-clamp-2'>
                                            {note.content}
                                        </p>
                                    </CardContent>
                                </Card>


                            )
                        }) : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default NotesList