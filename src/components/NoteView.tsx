import { INote, NoteViewProps } from "@/utils/notes";
import { saveNotesChanges } from "@/utils/saveChanges";
import { notesList } from "@/store/store";
import { useAtom } from "jotai";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import React, { useEffect, useState } from "react";
import { Save } from "react-feather";
import moment from "moment";

function NoteView({ note, setNote }: NoteViewProps) {
	const [content, setContent] = useState("");
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [writemodeTitle, setWriteModeTitleb] = useState(true);
	const [noteList, setNoteList] = useAtom(notesList);

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
					setNoteList(true);
				}
			});
		}
	};

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
					<span className="mr-4 ">{hasUnsavedChanges ? "Unsaved changes" : null}</span>
					<button onClick={saveChanges} className="text-primary">
						<Save />
					</button>
				</div>
			</div>
			<div className="rounded-s-[30px] bg-white p-6 ">
				
				<div className="" key={note?.id?.toString()}>
					<MdEditor
						modelValue={note?.content ? note.content.toString() : ""}
						onChange={(e) => {
							setContent(e);
							setHasUnsavedChanges(true);
						}}
						preview={false}
						language="en-US"
					/>
				</div>
			</div>
		</div>
	);
}

export default NoteView;
