import Book from "./book.js";
import * as storage from "./storage.js";
import * as frontend from "./frontend.js";
import * as validator from "./validator.js";

const uncompletedBtn = document.getElementById("uncompletedBtn");
const completedBtn = document.getElementById("completedBtn");
const booksContainer = document.getElementById("booksContainer");
const addBookBtn = document.getElementById("addBookBtn");
const addFormContainer = document.getElementById("addFormContainer");
const searchbar = document.getElementById("searchbar");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const addForm = document.getElementById("addForm");

let displayUncompleted = true;
let keyword = "";

if (!storage.isStorageExists()) {
    alert("WebStorage feature is not supported in this browser. Check your settings or use another browser");
}

function renderBooks() {
    booksContainer.innerHTML = "";

    uncompletedBtn.innerText = `Uncompleted Books (${storage.getUncompletedCount()})`;
    completedBtn.innerText = `Completed Books (${storage.getCompletedCount()})`;

    storage.getAllBooks(keyword).forEach(book => {
        if ((displayUncompleted && book.isCompleted) || (!displayUncompleted && !book.isCompleted)) return;

        let bookElement = frontend.createBookElement(book, displayUncompleted);
        booksContainer.appendChild(bookElement);

        document.getElementById(`deleteBtn-${book.id}`).addEventListener("click", _ => {
            frontend.showDeleteDialog().then((result) => {
                if (result.isConfirmed) {
                    storage.deleteBook(book);
                    renderBooks();
                    frontend.showToast(`"${book.title}" has been deleted`);
                }
            })

        })

        document.getElementById(`editBtn-${book.id}`).addEventListener("click", _ => {
            window.open(`/Bookshelv/edit.html?id=${book.id}`, "_self");
        })

        document.getElementById(`completeBtn-${book.id}`).addEventListener("click", _ => {
            book.isCompleted = displayUncompleted;
            storage.updateBook(book);
            renderBooks();
            frontend.showToast(`"${book.title}" marked as ${book.isCompleted ? "completed" : "uncompleted"}!`);
        })
    })
}

function switchTabs(mDisplayUncompleted) {
    displayUncompleted = mDisplayUncompleted;
    frontend.switchTabs(displayUncompleted, uncompletedBtn, completedBtn);
    renderBooks();
}

/* EVENT LISTENER */

document.addEventListener("DOMContentLoaded", _ => renderBooks());
uncompletedBtn.addEventListener("click", _ => switchTabs(true));
completedBtn.addEventListener("click", _ => switchTabs(false));
yearInput.addEventListener("input", _ => yearInput.value = validator.sanitizeYear(yearInput.value));
addBookBtn.addEventListener('click', _ => { frontend.showAddBookDialog(addBookBtn, addFormContainer) });
searchbar.addEventListener("input", _ => {
    keyword = searchbar.value.toLowerCase();
    renderBooks();
});

addForm.addEventListener("submit", e => {
    e.preventDefault();

    storage.insertBook(
        new Book(
            +new Date(),
            titleInput.value,
            authorInput.value,
            parseInt(yearInput.value),
            !displayUncompleted
        )
    );

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";

    renderBooks();
})

document.getElementById("footerText").innerText = (new Date().getFullYear()) + " © Joshua Sinaga";