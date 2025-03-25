const myLibrary = [];

const libraryContainer = document.getElementById("book-container");
const addBookPopup = document.querySelector(".add-book-popup");
const addBookButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close-popup");
const bookForm = document.querySelector("form");

// Constructor function for a Book object
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Generate unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Adds a new book to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Displays all books in the UI
function displayBooks() {
  libraryContainer.innerHTML = ""; // Clear existing content

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);

    // Populate book card with details
    bookCard.innerHTML = `
      <p class="book-title">${book.title}</p>
      <p class="book-author">by ${book.author}</p>
      <p class="book-pages">${book.pages} pages</p>
      <button class="status">${book.read ? "READ" : "NOT READ"}</button>
      <button class="book-remove">Remove</button>
    `;

    const removeButton = bookCard.querySelector(".book-remove"); 
    removeButton.addEventListener("click", () => removeBook(book.id)); 

    const readStatus = bookCard.querySelector(".status");
    readStatus.addEventListener("click", () => toggleReadStatus(book.id)); 
    readStatus.classList.toggle("unread", !book.read);

    libraryContainer.appendChild(bookCard)
  });
}

// Removes a book from the library
function removeBook(bookId){
  const bookIndex = myLibrary.findIndex(book => book.id === bookId);
  if(bookIndex !== -1){
    myLibrary.splice(bookIndex, 1); 
  }

  displayBooks(); 
}

// Toggles read status of a book
function toggleReadStatus(bookId){
  const book = myLibrary.find(book => book.id === bookId); 
  if(book){
    book.read = !book.read; 
  }

  displayBooks(); 
}

function addBookFromForm(event) {
  event.preventDefault(); // Prevent page refresh

  const titleInput = document.getElementById("input-title").value.trim();
  const authorInput = document.getElementById("input-author").value.trim();
  const pagesInput = document.getElementById("input-pages").value.trim();
  const readStatus = document.getElementById("input-status").checked;

  if (titleInput === "" || authorInput === "" || pagesInput === "" || isNaN(pagesInput)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const pages = parseInt(pagesInput, 10);

  addBookToLibrary(titleInput, authorInput, pages, readStatus);
  displayBooks();

  // Clear form and close popup
  bookForm.reset();
  addBookPopup.style.display = "none";
}

// Opens the Add Book popup
function openForm() {
  addBookPopup.style.display = "block";
}

// Closes the Add Book popup
function closeForm() {
  addBookPopup.style.display = "none";
}

addBookButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
bookForm.addEventListener("submit", addBookFromForm);

// Optional: Close form when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === addBookPopup) {
    closeForm();
  }
});