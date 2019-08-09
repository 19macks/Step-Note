//listen click on the button to add new note
const addNoteButton = document.querySelector('#add-note');
addNoteButton.addEventListener('click', async () => {
    let request = await fetch('/notes');
    window.location.href = request.url;
});

//listen click within each note
const noteContainer = document.querySelector('#notesList');
noteContainer.addEventListener('click', (event)=> {
    const target = event.target;
    const cardType = target.closest('.col-4').dataset.type;
    const id = target.closest('.col-4').dataset.id;

    //if click is on the close-button - delete the note
    if (target.classList.contains('btn-danger')) {
       return deleteNote(id, cardType);
    } else {
        return openNote(id, cardType);
    }
});

//delete note function with method DELETE
async function deleteNote(id, tmpPath) {
    let data = {
        _id: id
    };

    let request = await fetch(`/api/${tmpPath}/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });

    //response
    let response = await request.json();
    if (response.deleted) {
        //select and delete card
        const noteSelect = document.querySelector(`.col-4[data-id="${id}"]`);
        noteSelect.remove();
    }
}

// open note function
async function openNote(id, tmpPath) {
    let req = await fetch(`/${tmpPath}/${id}`);
    window.location.href = req.url;
}

