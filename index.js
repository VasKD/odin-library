// *************
// *  Globals  *
// *************

const myLibrary = [];
const modal = document.getElementById("newBookModal");
const createBtn = document.querySelector(".addBook");
const modalExit = document.getElementById("exit");
const submitBook = document.getElementById("submitBook");
const cardsContainer = document.getElementById("cards");




// ********************
// * Book Constructor *
// ********************

function Books(id, title, author, pageNum, cover, description, read){
    if (!new.target) {
        throw Error("You must use the new operator when calling a constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.cover = cover;
    this.description = description;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pageNum} pages, ${this.read}`;
    }
}




// ***************
// *  Functions  *
// ***************

// add books to library
function addBookToLibrary(title, author, pageNum, cover, description, read) {
    
    const objectID = crypto.randomUUID();
    console.log(objectID);

    const newBook = new Books(objectID, title, author, pageNum, cover, description, read);
    myLibrary.push(newBook);
    addCard(newBook);
    
    console.log(myLibrary);
    console.log(myLibrary[myLibrary.length - 1].info());
    displayBooks();
    console.log("A new book has been added to your library! " + newBook.title + " by " + newBook.author);

}


// add card to grid
function addCard(bookObject) {
    // create card container
    const card = document.createElement("div");
    card.classList.add("card");

    // create image element for cover
    const cover = document.createElement("img");
    cover.src = bookObject.cover;
    card.appendChild(cover);

    // create container for content
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    // add title of book
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = bookObject.title;
    console.log(title.textContent);
    contentContainer.appendChild(title);

    // add author of book
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = bookObject.author;
    console.log(author.textContent);
    contentContainer.appendChild(author);

    // add divider line
    const divider = document.createElement("hr");
    console.log(divider);
    contentContainer.appendChild(divider);

    // add description of book
    const description = document.createElement("p");
    description.classList.add("author");
    description.textContent = bookObject.description;
    console.log(description.textContent);
    contentContainer.appendChild(description);

    // add bottom portion of card
    const bottom = document.createElement("div");
    bottom.classList.add("bottom");
    contentContainer.appendChild(bottom);

    // add page number
    const pageNum = document.createElement("p");
    pageNum.classList.add("pageNum");
    pageNum.textContent = "# " + bookObject.pageNum;
    bottom.appendChild(pageNum);

    // add read button
    const read = document.createElement("button");
    read.classList.add("read");
    if (bookObject.read) {
        read.textContent = "Read";
    } else {
        read.textContent = "Not Read"
    }
    bottom.appendChild(read);


    // add card to the DOM
    card.appendChild(contentContainer);
    cardsContainer.appendChild(card);
}

// validate form values
function validateInfo (title, author, pageNum, cover) {
    if (titleCase(title) == undefined){
        alert("Please enter a title for the book");
    } else {
        title = titleCase(title);
    }

    if (titleCase(author) == undefined){
        alert("Please a name for the author");
    } else {
        author = titleCase(author);
    }

    if (isNaN(pageNum) || pageNum < 0) {
        alert("Please enter a number greater than 0");
    }

    if (!validateURL(cover)) {
        alert("Please enter a valid URL");
    }

    return [title, author];
   
}

// convert stings to title case
function titleCase (str) {
    if (str.length < 0) {
        return undefined;
    } else {
        return str.toLowerCase().split(' ').map(function(word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
}


// validate URL 
function validateURL (cover) {
     try {
        new URL(cover);
        return true;
    } catch (error) {
        return false;
    }
}   


function displayBooks () {
    for (const book of myLibrary){
        console.log(book.info());
    }
}




// *********************
// *  Event listeners  *
// *********************  

// open modal
createBtn.addEventListener("click", (e) => {
    modal.showModal();
});

// close modal
modalExit.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
});


// retrieve form values and return
let bookEntry = document.getElementById("bookEntry");
bookEntry.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pageNum = document.getElementById("pageNum").value;
    let cover = document.getElementById("cover").value;
    let description = document.getElementById("description").value;
    let read = document.getElementById("read").checked;
    
    let validated = validateInfo(title, author, pageNum, cover);
    if (validated) {
        title = validated[0];
        author = validated[1];
        addBookToLibrary(title, author, pageNum, cover, description, read);
    }
    bookEntry.reset(); // clear form after submission
});

