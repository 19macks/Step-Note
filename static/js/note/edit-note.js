// selector for button edit note
const editNoteButton = document.querySelector('#editNoteButton');

//edit button listener
editNoteButton.addEventListener('click', editNote);

async function editNote() {
    editNoteButton.removeEventListener('click', editNote);
    const titleValue = document.querySelector('#note-title').value;
    let textValue = document.querySelector('#note-text').value;

    // data will send to database, replace values of properties from input fields
    let noteId = editNoteButton.dataset.id;
    let data = {
        _id: noteId,
        title : titleValue, // input 1
        text: textValue //input 2
    };

    // put request
    let request = await fetch(`/api/notes/${noteId}`,
        {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

    window.location.href = request.url;
}