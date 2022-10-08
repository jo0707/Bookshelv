import Book from "./book.js";

let notyf;

try {
    notyf = new Notyf();
} catch(e) {}


export function createBookElement(book, uncompleted) {
    let div = document.createElement('div');
    div.innerHTML = `
    <div class="flex p-4 mt-4 w-full bg-slate-600/75 shadow-sm rounded transition-all hover:scale-[1.01] hover:shadow-xl">
    <div class="grow">
        <h3 class="text-base sm:text-lg">${book.title} (${book.year})</h3>
        <h3 class="mt-2 text-sm text-slate-200">${book.author}</h3>
    </div>
    
    <div class="my-auto py-auto">
        <button class="h-8 w-8 block sm:inline hover:scale-[1.2] transition-all" title="Delete Book" id="deleteBtn-${book.id}">
            <img src="/Bookshelv/assets/img/delete.png"/>      
        </button>
        <button class="h-8 w-8 block sm:inline hover:scale-[1.2] transition-all" title="Edit Book" id="editBtn-${book.id}">
            <img src="/Bookshelv/assets/img/edit.png"/>                                                            
        </button>
        <button class="h-8 w-8 block sm:inline hover:scale-[1.2] transition-all" title="Mark as ${uncompleted ? "completed" : "uncompleted"}" id="completeBtn-${book.id}">
            <img src="/Bookshelv/assets/img/${uncompleted ? "complete" : "rollback"}.png"/>
        </button>
    </div>
    </div>`

    return div.firstElementChild;
}

export function showAddBookDialog(addBookBtn, addFormContainer) {
    if (addFormContainer.classList.contains("hide")) {
        addBookBtn.innerText = "Close"
        addFormContainer.classList.remove("hide");
        addFormContainer.classList.add("show");
    } else {
        addBookBtn.innerText = "+ Add Book"
        addFormContainer.classList.remove("show");
        addFormContainer.classList.add("hide");
    }
}

export function showDeleteDialog() {
    return Swal.fire({
        title: 'Delete This Book?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        background: "#242943"
    })
}

export function showToast(message) {
    notyf.success(message);
}

export function switchTabs(displayUncompleted, uncompletedBtn, completedBtn) {
    if (displayUncompleted) {
        uncompletedBtn.classList.add("bg-slate-300/50")
        uncompletedBtn.classList.remove("bg-slate-600/50")
        completedBtn.classList.remove("bg-slate-300/50")
        completedBtn.classList.add("bg-slate-600/50")
    } else {
        completedBtn.classList.add("bg-slate-300/50")
        completedBtn.classList.remove("bg-slate-600/50")
        uncompletedBtn.classList.remove("bg-slate-300/50")
        uncompletedBtn.classList.add("bg-slate-600/50")
    }
}