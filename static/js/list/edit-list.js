const saveBtn = document.querySelector(".input-group-addon")
const taskList = document.querySelector('.container-for-task-item')
const area = document.querySelector('.area-label')
const editBtnToDo = document.querySelector('.edit-list-btn')
const checked = document.querySelector('.checkbox');
const deleteListButton = document.querySelector('.delete-list-btn');
// let isDone = false;
let currentLabelItem
let currentLabelVal

        saveBtn.addEventListener('click', () => {
    const warningText = document.querySelector('.warning-enter-text')
    const area = document.querySelector('.area-label')
    let taskVal = area.value

    if (taskVal) {
        warningText.classList.add('not-active')
        warningText.classList.remove('active')
        let id = Date.now()

        taskList.innerHTML += `<div class="funkyradio">
                                <div class="funkyradio-success">
                                    <input class="checkbox" type="checkbox"  name="checkbox" id='${id}' >
                                    <label class="task" for='${id}'>${taskVal}</label>
                                    <span class="${id} close-btn bg-white"><span class="glyphicon glyphicon-remove text-danger"></span></span>
                                    <span class="${id} edit-btn bg-white"><span class="glyphicon glyphicon-edit text-warning"></span></span>
                                    </div>
                                </div>`
        area.value = ''
        // isDone = !isDone
    } else {
        warningText.classList.add('active')
        warningText.classList.remove('not-active')
    }
})

taskList.addEventListener('click', function(event) {
    let target = event.target;
    let taskWrap = target.closest('.funkyradio')
    // console.log(target);

    if (target.className === 'glyphicon glyphicon-edit text-warning') {
        editTask(target)
    } else if (target.className === 'glyphicon glyphicon-ok save-change') {
        saveChangeTask(target)
    } else if (target.className === 'glyphicon glyphicon-remove text-danger') {
        taskWrap.remove()
    } else if (target.className === 'checkbox') {
        target.hasAttribute('checked') ? target.removeAttribute('checked') : target.setAttribute('checked', '')
    }

    if (target.className === 'task') {
        const checkedElem = target.closest('.funkyradio-success').children[0]
        console.log(checkedElem);
        console.log(`IS CHECKED: ${checkedElem.hasAttribute('checked')}`)
        if (!checkedElem.hasAttribute('checked')) {
            const completed = document.getElementsByClassName('container-for-task-item')[1];
            completed.appendChild(target.closest('.funkyradio'));

            // target.setAttribute('data-done', `${!isDone}`)
            // isDone = !isDone;
        }


    }
})

editBtnToDo.addEventListener('click', async () => {
    let titleVal = document.querySelector('#note-title').value
    let listsTasktText = taskList.querySelectorAll('label')
    let listsTasktStatus = taskList.querySelectorAll('input')
    let lists = []

    if (listsTasktText.length !== 0) {
        for (let i = 0; i < listsTasktText.length; i++ )
        {
            let task = {
                text: listsTasktText[i].innerText,
                status: listsTasktStatus[i].checked
            }
            lists.push(task)
        }
        let listId = editBtnToDo.dataset.id
        console.log(listId);
        let data = {
            _id: listId,
            _type: 'lists',
            title: titleVal,
            inputs: lists
        }
        let req = await fetch(`/api/lists/${listId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        window.location.href = req.url
    }
})

deleteListButton.addEventListener('click', async() => {
    let listId = deleteListButton.dataset.id;
    let data = {
        _id: listId
    }

    let req = await fetch(`/api/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    window.location.href = req.url
});

function editTask(target) {
    currentLabelItem = target.closest('.funkyradio')
    currentLabelVal = target.parentElement.parentElement.querySelector('.task').innerText
    let areaEdit = taskList.querySelector('#form-edit-wrap')

    if (areaEdit) {
        areaEdit.remove()
    }
    let formForEditArea = document.createElement('div')
    formForEditArea.setAttribute('method', 'post')
    formForEditArea.innerHTML = `<div id = 'form-edit-wrap' class="form-group">
                                            <div class="input-group" data-validate="length" data-length="5">
                                                <textarea type="text" class="form-control area-label area-edit" name="validate-length" id="validate-length" placeholder="Enter yours task" required > ${currentLabelVal} </textarea>
                                                <span class="input-group-addon success"><span class="glyphicon glyphicon-ok save-change"></span></span>
                                            </div>
                                         </div>`



    area.value = ""
    currentLabelItem.appendChild(formForEditArea)
}
function saveChangeTask(target) {
    let areaEdit = taskList.querySelector('.area-edit')
    let areaEditVal = areaEdit.value
    let label

    currentLabelItem = target.closest('.funkyradio')
    label = currentLabelItem.querySelector('.task')
    label.innerText = areaEditVal

    areaEdit.closest('.form-group').remove()
    area.closest('.area-creat-task').classList.remove('not-active')
}

document.getElementById("completed_tasks").addEventListener("click", ({target}) => {

    if (target.className === 'task') {
//         const checkedElem = target.closest('.funkyradio-success').children[0]
// console.log(`IS CHECKED: ${checkedElem.hasAttribute('checked')}`)
//      if (!checkedElem.hasAttribute('checked')) {
//          const notCompleted = document.getElementById('uncompleted_tasks');
//             notCompleted.appendChild(target.closest('.funkyradio'));
//}
        const checkedElem = target.closest('.funkyradio-success').children[0];
        console.log(`IS CHECKED: ${checkedElem.hasAttribute('checked')}`)
        if (!checkedElem.hasAttribute('checked')) {
            const notCompleted = document.getElementsByClassName('container-for-task-item')[0];
            console.log(checkedElem);
            notCompleted.appendChild(target.closest('.funkyradio'));
            console.log(target);
            // target.setAttribute('data-done', `${!isDone}`)
            // isDone = !isDone;
        }

        }


});
