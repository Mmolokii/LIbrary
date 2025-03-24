const myLibrary = [];

function Book(title, author, pages, read){
  this.id = crypto.randomUUID(); // generate a unique ID 
  this.title = title; 
  this.author = author; 
  this.pages = pages; 
  this.read = read; 
}

function addBookToLibrary(title, author, pages, read){
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook); 
}

function displayBooks() {
  const libraryContainer = document.getElementById("book-container"); 
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id); // Unique identifier

    // Add book details
    bookCard.innerHTML = `
      <p class="book-title">${book.title}</p>
      <p class="book-author">by ${book.author}</p>
      <p class="book-pages">${book.pages} pages</p>
      <button class="status">${book.read ? "READ" : "NOT READ"}</button>
      <button class="book-remove">Remove</button>
    `;

    libraryContainer.appendChild(bookCard);

    const removeButton = bookCard.querySelector(".book-remove"); 
    removeButton.addEventListener("click", () => removeBook(book.id)); 

    const readStatus = bookCard.querySelector(".status");
    readStatus.addEventListener("click", () => toggleReadStatus(book.id)); 
  });
}

function removeBook(bookId){
  const bookIndex = myLibrary.findIndex(book => book.id === bookId);
  if(bookIndex !== -1){
    myLibrary.splice(bookIndex, 1); 
  }

  displayBooks(); 
}

function toggleReadStatus(bookId){
  const book = myLibrary.find(book => book.id === bookId); 
  if(book){
    book.read = !book.read; 
  }

  displayBooks(); 
}


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

console.log(myLibrary); // Check if books are correctly added

displayBooks(); 

// Select button and popup elements
const  addBookBtn = document.querySelector(".add-book"); 
const popup = document.querySelector(".add-book-popup"); 

// show popup
function showPopup(){
  popup.style.display = "block"; 
}

// Attach event listener to the Add Book button
addBookBtn.addEventListener("click", showPopup);

function addBookFromForm(event) {
  event.preventDefault(); // Prevent form from refreshing the page

  // Select input fields
  const titleInput = document.getElementById("input-title").value.trim();
  const authorInput = document.getElementById("input-author").value.trim();
  const pagesInput = document.getElementById("input-pages").value.trim();
  const readStatus = document.getElementById("input-status").checked; // true if checked, false otherwise

  // Validate input (basic validation)
  if (titleInput === "" || authorInput === "" || pagesInput === "" || isNaN(pagesInput)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  // Convert pages input to a number
  const pages = parseInt(pagesInput, 10);

  // Add new book to the library
  addBookToLibrary(titleInput, authorInput, pages, readStatus);

  // Refresh book display
  displayBooks();

  // Clear form inputs
  document.getElementById("input-title").value = "";
  document.getElementById("input-author").value = "";
  document.getElementById("input-pages").value = "";
  document.getElementById("input-status").checked = false;

  // Close popup if using a modal
  document.querySelector(".add-book-popup").style.display = "none";
}

// Attach event listener to the form
document.querySelector("form").addEventListener("submit", addBookFromForm);