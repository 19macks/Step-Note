//listen click on the button to add new note
const addNoteButton = document.querySelector('#add-note');
addNoteButton.addEventListener('click', async () => {
    let request = await fetch('/notes');
    window.location.href = request.url;
});

//listen click within each note - whether click is on the close-button or on the card-body itself
let tmpPath;

const noteContainer = document.querySelector('#notesList');
noteContainer.addEventListener('click', (event)=> {
    const target = event.target;
    const cardType = target.closest('.col-4').dataset.type;
    const id = target.closest('.col-4').dataset.id;

    //if click is on the close-button - delete the note
    if (target.classList.contains('btn-danger')) {
       if (deleteNote(id, cardType)) {
           const noteSelect = document.querySelector(`.col-4[data-id="${id}"]`);
           return noteSelect.remove();
       }
   } else if (checkCard(target, cardType)) {
        tmpPath = checkCard(target, cardType);
        // console.log(tmpPath);
        return openNote(id, tmpPath);
    }
});

// check what we have note or list
function checkCard(targetCard, path) {

    if (targetCard.closest(`[data-type="${path}"]`) ) {
        // console.log(targetCard);
        return path;
    }
}
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
    if (request.deleted) {
        return true;
    }
}

// open note function
async function openNote(id, tmpPath) {
    console.log(tmpPath);
    let req = await fetch(`/${tmpPath}/${id}`);
    window.location.href = req.url;
}

