import { INote } from "./notes";


export async function saveNotesChanges(note : INote){

    const updateResponse = await fetch("/api/notes/edit",{
        method:"POST",
        body:JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
      }
      })
    const updateData = await updateResponse.json()
    console.log("update data",updateData);
    

    if(updateData._id == null){
        const newNoteResponse = await fetch("/api/notes/new",{
            method:"POST",
            body:JSON.stringify(note),
            headers: {
              "Content-Type": "application/json",
          }
          })
        const newNoteData = await newNoteResponse.json()
        console.log("new eecution");
        
        return newNoteData
    }

    return updateData
}