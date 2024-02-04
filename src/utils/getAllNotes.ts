
export const getAllNotes = async() => {
    let notesList  = await fetch("api/notes/",{
        method:"GET",
      })
    let noteListData = await notesList.json()
    return noteListData
}

export const getNotesBySearchTerm = async(searchTerm : string) => {
  let notesList  = await fetch(`api/notes?search=${searchTerm}`,{
      method:"GET",
    })
  let noteListData = await notesList.json()
  console.log("m",noteListData);
  
  return noteListData
}

