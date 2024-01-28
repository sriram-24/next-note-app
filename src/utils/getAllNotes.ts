
export const getAllNotes = async() => {
    let notesList  = await fetch("http://localhost:3000/api/notes/",{
        method:"GET",
      })
    let noteListData = await notesList.json()
    return noteListData
}