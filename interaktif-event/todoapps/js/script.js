
const todos = [];
const RENDER_EVENT = 'render-todo';

function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    // Membuat sebuah object dari todo dengan memanggil helper "generateTodoObject()" untuk membuat object baru.Kemudian, object tersebut disimpan pada array todos menggunakan metode push().
    const generateID = generateId();
    const todoObject = generateTodoObject(generateID, textTodo, timestamp, false);
    todos.push(todoObject);

    // Setelah disimpan pada array, kita panggil sebuah custom event RENDER_EVENT menggunakan method dispatchEvent(). Custom event ini akan kita terapkan untuk me-render data yang telah disimpan pada array todos.
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
    return + new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}

// Kode di atas adalah sebuah listener yang akan menjalankan kode yang ada didalamnya ketika event DOMContentLoaded dibangkitkan alias ketika semua elemen HTML sudah dimuat menjadi DOM dengan baik.
document.addEventListener('DOMContentLoaded', function(){
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event){
        event.preventDefault();
        addTodo();
    });
});

// catatan terakhir materi menampilkan todo => Setelah selesai menambahkan fungsi di atas, mari kita beralih ke memodifikasi event listener render, agar menampilkan data yang sesuai, misalnya todo yang belum dikerjakan akan diletakkan pada “Yang harus dibaca”.
// "!" adalah kebalikan dari nilai
document.addEventListener(RENDER_EVENT, function(){

    // kode event handler dari custom event untuk menerapkan makeTodo().
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    //catatan : Materi menampilkan item Todo yang selesai dan menghapus TODO. perlu memodifikasi kode pada event listener kembali, tujuannya,  ketika todo tersebut sudah masuk dalam status selesai (isCompleted == true) akan ditampilkan pada tampilan web.
    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML='';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if(!todoItem.isCompleted)
        uncompletedTODOList.append(todoElement);
    else
        completedTODOList.append(todoElement);    
    }
})

// mari kita ekstrak satu per satu data yang ditampilkan. Jika dilihat, terdapat title, timestamp dan check button. Jika sudah memahaminya, kita akan membuat fungsi bernama makeTodo seperti berikut.
function makeTodo(todoObject){
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id',`todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
        // beberapa kode tersebut membuat sebuah button dengan mengimplementasikan class check-button.
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');

        undoButton.addEventListener('click', function(){
            undoTaskFromCompleted(todoObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');

        trashButton.addEventListener('click', function() {
            removeTaskFormCompleted(todoObject.id);
        });

        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');

        checkButton.addEventListener('click', function() {
            addTaskToCompleted(todoObject.id);
        });
        container.append(checkButton);
    }
    return container;
}

// agar fungsi check button berfunsi maka kita perlu menuliskan fungsi dibawah
function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);

    if(todoTarget == null) return;

    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

// fungsi diatas memanggil fungsi baru, yaitu findTodo, yang mana berfungsi untuk mencari todo dengan ID yang sesuai pada array todos. Agar tidak terjadi error (undefined), tuliskan kodenya seperti berikut.
function findTodo(todoId) {
    for (const todoItem of todos) {
        if (todoItem.id === todoId) {
            return todoItem;
        }
    }
    return null;
}

// function menghapus TODO berdasarkan index yang didapatkan dari pencarian Todo dengan menggunakan "findTodoIndex()".Apabila pencarian berhasil, maka akan menghapus todo tersebut menggunakan fungsi splice() yang disediakan oleh JavaScript.
function removeTaskFormCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if(todoTarget === -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
    // fungsi diubah ke nilai false karena bertujuan agar todo task yang sebelumnya completed(selesai), bisa dipindah menjadi incomplete(belum selesai);
    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodoIndex(todoId) {
    for (const index in todos) {
        if (todos[index].id === todoId){
            return index;
        }
    }
    return -1;
}