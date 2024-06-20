const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const bookTitle = document.querySelector("#inputBookTitle").value;
    const bookAuthor = document.querySelector("#inputAuthor").value;
    const bookPages = Number(document.querySelector("#inputPages").value);
    const bookRead = document.querySelector("#inputRead").checked;

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    myLibrary.push(newBook);
}