const myLibrary = [];


// book object constructor
function Books(id, title, author, pageNum, read){
    if (!new.target) {
        throw Error(" You must use the new operator when calling a constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pageNum = pageNum + " pages";
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pageNum}, ${this.read}`;
    }
}

function addBookToLibrary() {
    let title = prompt("What is the title of the book?: ");
    if (title === null) {
        return;
    }
    let author = prompt("Who is the author of the book?: ");
    let pageNum = prompt("How many pages is the book?: ");
    let read = prompt("Have you read this book? (yes or no): ");
    

    // input validation
        // ...

    const objectID = crypto.randomUUID();
    console.log(objectID);

    const newBook = new Books(objectID, title, author, pageNum, read);
    myLibrary.push(newBook);
    console.log(myLibrary);
    console.log(myLibrary[myLibrary.length - 1].info());
    alert("A new book has been added to your library! " + newBook.title + " by " + newBook.author);

    let add = prompt("Would you like to add another book?: ");
    if (add == "yes"){
        addBookToLibrary();
    } else {
        displayBooks();
    }


}


function displayBooks () {
    for (const book of myLibrary){
        console.log(book.info());
    }
}



const createBtn = document.querySelector(".create");
createBtn.addEventListener("click", addBookToLibrary);