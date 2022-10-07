import Book from "./book.js";

export const BOOKS_KEY = "books";
let tempBooks = [];

export function isBookExists(book) {
    return tempBooks.indexOf(book) != -1;
}

export function getUncompletedCount() {
    return tempBooks.filter(book => !book.isCompleted).length;
}

export function getCompletedCount() {
    return tempBooks.filter(book => book.isCompleted).length;
}

export function getAllBooks(query) {
    if (query) {
        return tempBooks.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
    } else return tempBooks;
}

export function getBook(id) {
    return tempBooks.find(book => book.id == id);
}

export function insertBook(book) {
    tempBooks.push(book);
    saveToStorage()
}

export function updateBook(book) {
    tempBooks[tempBooks.findIndex(tBook => book.id == tBook.id)] = book;
    saveToStorage();
}

export function deleteBook(book) {
    tempBooks.splice(tempBooks.indexOf(book), 1);
    saveToStorage();
}



export function saveToStorage() {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(tempBooks));
}

export function initBooks() {
    if (!localStorage.getItem(BOOKS_KEY)) {
        localStorage.setItem(BOOKS_KEY, "[]");
    }

    tempBooks = JSON.parse(localStorage.getItem(BOOKS_KEY));
    tempBooks = tempBooks.map(obj => new Book(
        obj.id,
        obj.title,
        obj.author,
        parseInt(obj.year),
        obj.isCompleted
    ));
}

export function isStorageExists() {
    initBooks();
    return typeof Storage !== "undefined";
}