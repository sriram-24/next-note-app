import { INote, NoteViewProps } from "@/utils/notes";
import { saveNotesChanges } from "@/utils/saveChanges";
import { notesList, previewMode } from "@/store/store";
import { useAtom } from "jotai";
import { MdEditor, MdPreview } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import React, { useEffect, useState } from "react";
import { Edit3, Eye, Save, Trash } from "react-feather";
import moment from "moment";
import DeleteNoteDialog from "./DeleteNoteDialog";
import { deleteNoteById } from "@/utils/deleteNote";

function NoteView({ note, setNote }: NoteViewProps) {
	const [content, setContent] = useState("");
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [writemodeTitle, setWriteModeTitleb] = useState(true);
	const [noteList, setNoteList] = useAtom(notesList);
	const [isPreview, setPreviewMode] = useAtom(previewMode)

	const setWriteModeTitle = () => {
		setWriteModeTitleb(false);
	};

	const setNoteTitle = (e: any) => {
		const newNote: INote = {
			id: note?.id,
			title: e.target.value,
			content: note?.content,
			_createdDate: note?._createdDate,
		};
		if (setNote) {
			setNote(newNote);
			setHasUnsavedChanges(true);
		}
	};

	const ToggleEditMode = () =>{
		setPreviewMode(!isPreview)
	}

	const saveChanges = () => {
		if (note?.id) {
			if (content !== null && content !== "") {
				note.content = content;
			}
			saveNotesChanges(note).then((data) => {
				if (setNote) {
					const dummy = {
						id: data._id,
						title: data.title,
						content: data.content,
						_createdDate: data._createdDate,
					};
					setNote(dummy);
					setHasUnsavedChanges(false);
					setNoteList(true,null);
				}
			}).catch((err : any)=>{
				console.log("Error occurred.",err);
				
			});
		}
	};

	const deleteNote = (note : INote | undefined) =>{
		if(note?.id){
			deleteNoteById(note.id).then((data)=>{
				if(data){
					setNoteList(true,null);
					if(setNote){
						setNote({})
					}
				}
			}
			).catch((err : any)=>{
				console.log(err);
			})
		}
		
	}

	useEffect(() => {
		const onBeforeUnload = (e: any) => {
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
		<div className=" hidden md:block flex-grow-0 flex-shrink-0 basis-3/4 bg-surface-background/20">
			<div className="p-2 flex ml-4 mt-2 items-center justify-between">
				<div>
					<input
						className="font-bold bg-surface-light focus:bg-white focus:outline-1 focus:outline-secondary/30 rounded-full py-2 pl-4"
						type="text"
						readOnly={writemodeTitle}
						onClick={setWriteModeTitle}
						value={note?.title ? note.title.toString() : ""}
						onChange={setNoteTitle}
					/>
					
				</div>
				<div>
					<span className="text-sm">{moment(note?._createdDate).format('MMMM D, YYYY')+" at "+ moment(note?._createdDate).format('h:m a')}</span>
				</div>
				<div className="flex items-center mr-6">
					<button onClick={ToggleEditMode}>
						{isPreview ?  <Edit3 /> :<Eye /> }
					</button>
					<span className="mr-4 ">{hasUnsavedChanges ? "Unsaved changes" : null}</span>
					<button onClick={saveChanges} className="mr-4">
						<Save />
					</button>
					<button className="mr-4 text-red-600">
						<DeleteNoteDialog onCancel={()=>null} onConfirm={()=>{deleteNote(note)}} /> 
					</button>
				</div>
			</div>
			<div className="rounded-s-[30px] bg-white p-6 ">
				
				<div className="max-h-[575px] overflow-y-scroll" key={note?.id?.toString()}>
					{
						isPreview?  <MdPreview className="" modelValue={note?.content ? note.content.toString() : ""} language="en-US"/> 
						:
						<MdEditor
						modelValue={note?.content ? note.content.toString() : ""}
						onChange={(e) => {
							setContent(e);
							setHasUnsavedChanges(true);
						}}
						preview={false}
						language="en-US"
					/>
					}
				</div>
			</div>
		</div>
	);
}

export default NoteView;
