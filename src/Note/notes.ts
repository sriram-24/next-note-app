import { MouseEventHandler } from "react";

export interface ModalProps{
    open : boolean,
    onClose : MouseEventHandler,
    children? : any
}

export interface NoteViewProps{
    note ?: INote
    setNote? : Function
}

export interface INote{
    id : String,
    title : String,
    content ?: String,
    _createdDate: Date,
    setContent : Function
}