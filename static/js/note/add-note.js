    // selector for button create new note
    const createNoteButton = document.querySelector('#createNoteButton');

    //create button listener
    createNoteButton.addEventListener('click', createNote);

    async function createNote() {
        // createNoteButton.removeEventListener('click', createNote);
        const titleValue = document.querySelector('#note-title').value;
        const textValue = document.querySelector('#note-text').value;

        // data will send to database, replace values of properties from input fields
        let data = {
            title: titleValue,  // input 1
            text: textValue //input 2
        };

        // post request
        let request = await fetch('/api/notes',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

        // let answer = await request.json();
        // console.log(answer);
        console.log(request);

        window.location = request.url;
}

