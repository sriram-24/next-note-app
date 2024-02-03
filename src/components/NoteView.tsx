import { INote, NoteViewProps } from "@/utils/notes";
import { saveNotesChanges } from "@/utils/saveChanges";
import { notesList } from "@/store/store";
import { useAtom } from "jotai";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import React, { useEffect, useState } from "react";
import { Save } from "react-feather";

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
		<div className=" hidden md:block flex-grow-0 flex-shrink-0 basis-3/4 bg-surface p-6">
			<div>
				<div>
					<input
						className="font-bold"
						type="text"
						readOnly={writemodeTitle}
						onClick={setWriteModeTitle}
						value={note?.title ? note.title.toString() : ""}
						onChange={setNoteTitle}
					/>
					<span>{hasUnsavedChanges ? "Unsaved changes" : null}</span>
				</div>
				<div>
					<button onClick={saveChanges}>
						<Save />
					</button>
				</div>
			</div>
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
	);
}

export default NoteView;
