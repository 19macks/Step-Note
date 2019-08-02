
createNote();

function createNote() {
    // selector for button create new note
    const createNoteButton = document.querySelector('.test');

    //create button listener
    createNoteButton.addEventListener('click', async () => {

        // data will send to database, replace values of properties from input fields
        let data = {
            title : 'test',  // input 1
            text: 'test' //input 2
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

        window.location = request.url;
    });
}

