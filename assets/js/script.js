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
    displayLibrary();
}

function displayLibrary() {
    const tableBody = document.querySelector("#libraryTableBody");
    tableBody.textContent = "";

    myLibrary.forEach(book => {
        const row = document.createElement("tr");
        row.textContent = `
            <td>${book.author}</td>
            <td>${book.title}</td>
            <td>${book.pages}</td>
            <td>${book.read ? "Yes" : "No"}</td>`;
        
        tableBody.appendChild(row);
    });
}