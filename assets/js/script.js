const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const bookTitle = document.querySelector("#inputTitle").value;
    const bookAuthor = document.querySelector("#inputAuthor").value;
    const bookPages = Number(document.querySelector("#inputPages").value);
    const bookRead = document.querySelector("#inputRead").value === "true";

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    myLibrary.push(newBook);
    displayLibrary();
    addBookForm.reset();
    addBookDialog.close();
}

function displayLibrary() {
    const tableBody = document.querySelector("#libraryTableBody");
    tableBody.textContent = "";

        

    myLibrary.forEach((book, index) => {
        const styleSwitch = book.read ? "read" : "not-read";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.author}</td>
            <td>${book.title}</td>
            <td>${book.pages}</td>
            <td><button class="toggleStatus ${styleSwitch}" data-index="${index}">${book.read ? "Read" : "Not Read"}</button></td>
            <td><button class="removeBookButton" data-index="${index}">&times;</button></td>`;
        
        tableBody.appendChild(row);
    });

    attachRemoveEventListeners();
    toggleStatus();
}

const addBookButton = document.querySelector("#addBookButton");
const addBookDialog = document.querySelector("#addBookDialog");
const addBookCancel = document.querySelector("#cancelButton");
const addBookForm = document.querySelector("#addBookForm");

function attachRemoveEventListeners() {
    const removeBookButtons = document.querySelectorAll(".removeBookButton");

    removeBookButtons.forEach(button => {
        button.addEventListener("click", () => {
        const indexToRemove = button.getAttribute("data-index");
        myLibrary.splice(indexToRemove, 1);
        displayLibrary();
    });
})
}

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})

addBookCancel.addEventListener("click", () => {
    addBookDialog.close();
})

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBookToLibrary();
})

function toggleStatus() {
    const toggleButtons = document.querySelectorAll(".toggleStatus");
    toggleButtons.forEach(button => {
        const statusIndex = button.getAttribute("data-index");
        button.addEventListener("click", () => {
            myLibrary[statusIndex].read = !myLibrary[statusIndex].read;
            displayLibrary();
        });
    });
}

