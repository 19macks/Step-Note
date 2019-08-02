let path = window.location;

//listen click on the button to add new note
const addNoteButton = document.querySelector('#add-note');
addNoteButton.addEventListener('click', async () => {
    window.location = path + 'notes';
});

//listen click within each note - whether click is on the close-button or on the card-body itself
const noteContainer = document.querySelector('#notesList');
noteContainer.addEventListener('click', (event)=> {
    const note = event.target;
    let id = note.dataset.id;
    // console.log(note);

    //if click is on the close-button - delete the note
    if (note.classList.contains('btn-danger')) {
       return deleteNote(id);
   }
    //if click is on the card-body - go to the new route by card id
   if (note.classList.contains('note-item')){
       id = note.dataset.id;
       window.location = path + 'notes/' + id;
       return openNote(id);
   }
});

//delete note function with method DELETE
async function deleteNote(id) {
    let data = {
        _id: id
    };

    let req = await fetch(`/api/notes/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
}

// open note function
async function openNote(id) {
    let req = await fetch(`/notes/${id}`);
    // window.location.href = req.url;
}
