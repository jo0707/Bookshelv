import Book from "./book.js";
import * as storage from "./storage.js";
import * as frontend from "./frontend.js";
import * as validator from "./validator.js";

const editContainer = document.getElementById("editContainer");
const notFoundContainer = document.getElementById("notFoundContainer");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const editForm = document.getElementById("editForm");

const id = (new URL(document.location)).searchParams.get("id"); 
let book;

if (!storage.isStorageExists()) {
    alert("WebStorage feature is not supported in this browser. Check your settings or use another browser");
}

function autofillField() {
    book = storage.getBook(id);

    if (id && book) {
        editContainer.classList.remove("hidden");

        titleInput.value = book.title;
        authorInput.value = book.author;
        yearInput.value = book.year;
    } else {
        notFoundContainer.classList.remove("hidden");
    }
}

function updateBook() {
    storage.updateBook(
        new Book(
            book.id,
            titleInput.value,
            authorInput.value,
            parseInt(yearInput.value),
            book.isCompleted
        )
    );

    window.open("/index.html", "_self");
}

/* EVENT LISTENER */
document.addEventListener("DOMContentLoaded", _ => autofillField());
yearInput.addEventListener("input", _ => yearInput.value = validator.sanitizeYear(yearInput.value))
editForm.addEventListener("submit", e => {
    e.preventDefault();
    updateBook();
})