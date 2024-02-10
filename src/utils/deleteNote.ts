import { INote } from "./notes";


export async function deleteNoteById(noteId : String){

    const updateResponse = await fetch(`/api/notes/delete/${noteId}`,{
        method:"DELETE"
      })
    const updateData = await updateResponse.json()
    
    if(updateData._id!==null){
        return true
    }

    return false
}