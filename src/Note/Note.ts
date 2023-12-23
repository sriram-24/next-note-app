import { INote } from "./notes";
import { v4 as uuidv4 } from 'uuid';

export default class Note implements INote{

    id: String;
    title: String;
    content?: String | undefined;
    _createdDate: Date;

    constructor(){
        this.id = uuidv4()
        this.title = "Untitled"
        this.content = "Start your note by typing here..."
        this._createdDate= new Date()

    }

    setContent(content:string):void{
        this.content = content
    }
    
    
}

