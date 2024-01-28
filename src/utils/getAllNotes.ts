
export const getAllNotes = async() => {
    let notesList  = await fetch("/api/notes/",{
        method:"GET",
      })
    let noteListData = await notesList.json()
    return noteListData
}