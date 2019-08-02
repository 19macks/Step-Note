let path = window.location;

const addNoteButton = document.querySelector('#add-note');
addNoteButton.addEventListener('click', async () => {
    console.log(path);
    window.location = path + 'notes';
});