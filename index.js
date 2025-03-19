// *************
// *  Globals  *
// *************

const myLibrary = [];
const modal = document.getElementById("newBookModal");
const createBtn = document.getElementById("addBook");
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
    card.id = bookObject.id;

    // create image element for cover
    const cover = document.createElement("img");
    cover.src = bookObject.cover;
    card.appendChild(cover);

    // create container for content
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    // create container for top 
    const topContainer = document.createElement("div");
    topContainer.classList.add("top");

    // add title of book
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = bookObject.title;
    console.log(title.textContent);
    topContainer.appendChild(title);

    // add author of book
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = bookObject.author;
    console.log(author.textContent);
    topContainer.appendChild(author);

    // add divider line
    const divider = document.createElement("hr");
    console.log(divider);
    topContainer.appendChild(divider);

    const descContainer = document.createElement("div");
    descContainer.classList.add("description");

    // add description of book
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = bookObject.description;
    console.log(description.textContent);
    descContainer.appendChild(description);

    // add desc container to top
    topContainer.appendChild(descContainer);

    // add top container to  content
    contentContainer.appendChild(topContainer);

    // add bottom portion of card
    const bottom = document.createElement("div");
    bottom.classList.add("bottom");
    contentContainer.appendChild(bottom);

    // add page number
    const pageNum = document.createElement("p");
    pageNum.classList.add("pageNum");
    const hashtag = document.createElement("img");
    hashtag.src = "./img/hashtag-svgrepo-com (1).svg";
    hashtag.alt = "hashtag icon";
    // Create the text node for the page number
    const pageText = document.createTextNode(`${bookObject.pageNum}`);
    pageNum.appendChild(hashtag);
    pageNum.appendChild(pageText);
    bottom.appendChild(pageNum);

    // add buttons container
    const btns = document.createElement("div");
    btns.classList.add("buttons");

    // add read button
    const read = document.createElement("button");
    read.classList.add("read");
    if (bookObject.read) {
        read.textContent = "Read";
    } else {
        read.textContent = "Not Read"
    }
    btns.appendChild(read);

    // add trash icon
    const del = document.createElement("button");
    del.classList.add("delete");
    const trashCan = document.createElement("img");
    trashCan.src = "./img/trash-svgrepo-com.svg";
    trashCan.alt = "trash icon";
    del.appendChild(trashCan);
    btns.appendChild(del);

    bottom.appendChild(btns);
    contentContainer.appendChild(bottom);


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


// const readButtons = document.querySelectorAll("button.read");
// readButtons.forEach((readButton) => {
//     readButton.addEventListener("click", (e) => {
//     let parentCard = e.currentTarget.closest(".card");
//     console.log(parentCard.id);
//     console.log(readButton.textContent);
//     if (readButton.textContent == "Read"){
//         readButton.textContent = "Not Read";
//         readButton.style.color = "#dda15e";
        
//         console.log(e.currentTarget.closest(".card"));
        
//     } else if (readButton.textContent == "Not Read") {
//         readButton.textContent = "Read";
//         readButton.style.color = "#606c38";
//     }
//     });

// });


document.addEventListener("click", function(e) {
    if (e.target.matches("button.read")){
        console.log("Hurrah!! " + e.target.textContent);
        let parentCard = e.target.closest(".card");
        const bookObject = myLibrary.find((bookObject) => bookObject.id = parentCard.id);
        console.log(parentCard.id);
        if (e.target.textContent == "Read") {
            e.target.textContent = "Not Read";
            e.target.style.color = "#dda15e";
            bookObject.read = false;
        } else if (e.target.textContent == "Not Read") {
            e.target.textContent = "Read";
            e.target.style.color = "#606c38";
            bookObject.read = true;
        }
        console.log(bookObject.info());

    }
});

