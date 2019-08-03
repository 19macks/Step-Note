//listen click on the button to add new note
const addNoteButton = document.querySelector('#add-note');
addNoteButton.addEventListener('click', async () => {
    let request = await fetch('/notes');
    window.location.href = request.url;
});

//listen click within each note - whether click is on the close-button or on the card-body itself
const noteContainer = document.querySelector('#notesList');
noteContainer.addEventListener('click', (event)=> {
    const note = event.target;
    let id = note.dataset.id;

    //if click is on the close-button - delete the note
    if (note.classList.contains('btn-danger')) {
       if (deleteNote(id)) {
           const noteSelect = document.querySelector(`.col-4[data-id="${id}"]`);
           return noteSelect.remove();
       }
   } else if (note.classList.contains('card-title') || note.classList.contains('card-text')) {
        id = note.parentNode.dataset.id;
        return openNote(id);
    }
    //if click is on the card-body - go to the new route by card id
   else {
       id = note.dataset.id;
       return openNote(id);
   }
});

//delete note function with method DELETE
async function deleteNote(id) {
    let data = {
        _id: id
    };

    let request = await fetch(`/api/notes/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    if (request.deleted) {
        return true;
    }
}

// open note function
async function openNote(id) {
    let req = await fetch(`/notes/${id}`);
    window.location.href = req.url;
}
