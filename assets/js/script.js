class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.myLibrary = [];
  }

  addBookToLibrary() {
    const bookTitle = document.querySelector("#inputTitle").value;
    const bookAuthor = document.querySelector("#inputAuthor").value;
    const bookPages = Number(document.querySelector("#inputPages").value);
    const bookRead = document.querySelector("#inputRead").value === "true";

    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);

    this.myLibrary.push(newBook);
    this.displayLibrary();
    addBookForm.reset();
    addBookDialog.close();
  }

  displayLibrary() {
    const tableBody = document.querySelector("#libraryTableBody");
    tableBody.textContent = "";

    this.myLibrary.forEach((book, index) => {
      const styleSwitch = book.read ? "read" : "not-read";
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${book.author}</td>
                <td>${book.title}</td>
                <td>${book.pages}</td>
                <td><button class="toggleStatus ${styleSwitch}" data-index="${index}">${
        book.read ? "Read" : "Not Read"
      }</button></td>
                <td><button class="removeBookButton" data-index="${index}">&times;</button></td>`;

      tableBody.appendChild(row);
    });

    this.attachRemoveEventListeners();
    this.toggleStatus();
  }

  attachRemoveEventListeners() {
    const removeBookButtons = document.querySelectorAll(".removeBookButton");

    removeBookButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const indexToRemove = button.getAttribute("data-index");
        this.myLibrary.splice(indexToRemove, 1);
        this.displayLibrary();
      });
    });
  }

  toggleStatus() {
    const toggleButtons = document.querySelectorAll(".toggleStatus");
    toggleButtons.forEach((button) => {
      const statusIndex = button.getAttribute("data-index");
      button.addEventListener("click", () => {
        this.myLibrary[statusIndex].read = !this.myLibrary[statusIndex].read;
        this.displayLibrary();
      });
    });
  }
}

const library = new Library();

const addBookButton = document.querySelector("#addBookButton");
const addBookDialog = document.querySelector("#addBookDialog");
const addBookCancel = document.querySelector("#cancelButton");
const addBookForm = document.querySelector("#addBookForm");

addBookButton.addEventListener("click", () => {
  addBookDialog.showModal();
});

addBookCancel.addEventListener("click", () => {
  addBookDialog.close();
  clearErrors();
  addBookForm.reset();
});

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  if (!author.validity.valid) {
    showError(author, authorError);
    isValid = false;
  }

  if (!title.validity.valid) {
    showError(title, titleError);
    isValid = false;
  }

  if (!pages.validity.valid) {
    showError(pages, pagesError);
    isValid = false;
  }

  if (isValid) {
    library.addBookToLibrary();
  }
});

// Form Validation

const author = document.querySelector("#inputAuthor");
const authorError = document.querySelector("#author-error");
const title = document.querySelector("#inputTitle");
const titleError = document.querySelector("#title-error");
const pages = document.querySelector("#inputPages");
const pagesError = document.querySelector("#pages-error");

author.addEventListener("input", (event) => {
  if (author.validity.valid) {
    authorError.id = "author-error";
    authorError.classList.remove("active");
  } else {
    showError(author, authorError);
  }
});

title.addEventListener("input", (event) => {
  if (title.validity.valid) {
    titleError.id = "title-error";
    titleError.classList.remove("active");
  } else {
    showError(title, titleError);
  }
});

pages.addEventListener("input", (event) => {
  if (pages.validity.valid) {
    pagesError.id = "pages-error";
    pagesError.classList.remove("active");
  } else {
    showError(pages, pagesError);
  }
});

function showError(input, errorElement) {
  if (input.validity.valueMissing) {
    errorElement.textContent = `Missing ${input.name}.`;
  } else if (input.validity.tooShort) {
    errorElement.textContent = `Minimum character length of ${input.minLength}, you have entered ${input.value.length} character(s).`;
  } else if (input.validity.rangeUnderflow) {
    errorElement.textContent = `Minimum page count of ${input.min}, you have entered ${input.value}.`;
  }
  errorElement.classList.add("active");
}

function clearErrors() {
  authorError.classList.remove("active");
  titleError.classList.remove("active");
  pagesError.classList.remove("active");
}
