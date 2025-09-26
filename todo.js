const inputs = document.getElementById('inputText')
const btn = document.getElementById('addButton')
const list = document.getElementById('Lists')


let tasks = JSON.parse(localStorage.getItem('tasks')) || []
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}



function renderTask() {
    // btn.addEventListener('click', () => {
    list.innerHTML = ''
    tasks.forEach((task, index) => {


        const lis = document.createElement('li');
        lis.className = 'kig'

        const textspan = document.createElement('span')
        textspan.textContent = task.text
        textspan.classList.add('task-text')
        if (task.completed) {

            textspan.classList.add('completed')
        }



        textspan.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            renderTask();
        });


        const delbtn = document.createElement('button')
        delbtn.textContent = 'Delete'
        delbtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks()
            renderTask()
        });

        lis.appendChild(textspan)
        lis.appendChild(delbtn)
        list.appendChild(lis)
        inputs.value = ''
    });
}


function addTask() {
    const inputText = inputs.value.trim();
    if (inputText !== '') {

        const newTask = { text: inputText, completed: false }
        tasks.push(newTask)

        saveTasks()
        renderTask();
        inputs.value = ''


    }


}
btn.addEventListener('click', addTask)
inputs.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask()

    }

});
renderTask();


