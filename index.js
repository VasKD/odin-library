// *************
// *  Globals  *
// *************

const myLibrary = [];
const modal = document.getElementById("newBookModal");
const createBtn = document.getElementById("addBook");
const modalExit = document.getElementById("exit");
const submitBook = document.getElementById("submitBook");
const cardsContainer = document.getElementById("cards");
const completedButton = document.getElementById("completed");
const toBeReadButton = document.getElementById("toBeRead");
const homeButton = document.getElementById("home");



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
 

// add default cards
addBookToLibrary("The Love Hypothesis", 
    "Ali Hazelwood", 
    432, 
    "./img/loveHypothesis.png", 
    'A witty STEM romance about Ph.D. student Olive Smith, who fakes a relationship with grumpy professor Adam Carlsen to convince her friend she is over an ex. What starts as a harmless ruse soon sparks real chemistry, leading to unexpected love amidst academia and emotional growth.', true
);


addBookToLibrary("One Dark Window",
    "Rachel Gillig",
    399,
    "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1734440714i/58340706.jpg",
    'Elspeth needs a monster. The monster might be her. Elspeth Spindle needs more than luck to stay safe in the eerie, mist-locked kingdom of Blunder—she needs a monster. She calls him the Nightmare, an ancient, mercurial spirit trapped in her head. He protects her. He keeps her secrets.But nothing comes for free, especially magic.',
    false
);


// create card structure and add card to grid
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

    // add hashtag icon
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
        read.style.color = "#dda15e";
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

    // add card to the DOM
    bottom.appendChild(btns);
    contentContainer.appendChild(bottom);
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


function displayBooks (str ="") {
    cardsContainer.innerHTML = ""; // clear cards before displaying again
    
    if (str === "completed") {
        const completedBooks = myLibrary.filter(book => book.read === true);
        // console.log(completedBooks);
        for (const book of completedBooks){
            addCard(book);
        } 
    } else if (str === "toBeRead") {
        const toBeReadBooks = myLibrary.filter(book => book.read === false);
        // console.log(toBeReadBooks);
        for (const book of toBeReadBooks){
            addCard(book);
        } 
    } else {
        for (const book of myLibrary){
            addCard(book);
        }    
    }   
}


// highlight buttons clicked on the sidebar
function addHighlight(toBeHighlighted, toBeInverted) {
    // retrieve container and button currently highlighted / inverted 
    const highlighted = document.getElementsByClassName("highlight");
    const clicked = document.getElementsByClassName("clicked");

    // remove the classes to remove styling 
    highlighted[0].classList.remove("highlight");
    clicked[0].classList.remove("clicked");

    // highlight and invert button that was clicked
    toBeHighlighted.classList.add("highlight");
    toBeInverted.classList.add("clicked");
}



// *********************
// *  Event listeners  *
// *********************  


// display books that have been read
completedButton.addEventListener("click", (e) => {
    displayBooks("completed");
    addHighlight(e.target.closest("li"), e.target.closest("button"));
});


// display books yet to be read
toBeReadButton.addEventListener("click", (e) => {
    displayBooks("toBeRead");
    addHighlight(e.target.closest("li"), e.target.closest("button"));
});


// display all books at home page
homeButton.addEventListener("click", (e) => {
    displayBooks();
    addHighlight(e.target.closest("li"), e.target.closest("button"));
});


// open add book modal
createBtn.addEventListener("click", (e) => {
    console.log(e.target.closest("li"));
    modal.showModal();
    addHighlight(e.target.closest("li"), e.target.closest("button"));
});

// close add book modal
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


// handle a change in read status
document.addEventListener("click", (e) => {
    if (e.target.matches("button.read")){
        // find the parent card of the button
        let parentCard = e.target.closest(".card");

        // retrieve the object with the same book ID
        const bookObject = myLibrary.find((bookObject) => bookObject.id === parentCard.id);
        // console.log(parentCard.id);

        // change the status on the card and update the associated object
        if (e.target.textContent == "Read") {
            e.target.textContent = "Not Read";
            e.target.style.color = "#dda15e";
            bookObject.read = false;
        } else if (e.target.textContent == "Not Read") {
            e.target.textContent = "Read";
            e.target.style.color = "#606c38";
            bookObject.read = true;            
        }
        // console.log(bookObject.info());

    }
});


// delete respective card and display updated library
document.addEventListener("click", (e) => {
    if (e.target.closest("button.delete")) {
        let parentCard = e.target.closest(".card");
        const bookObject = myLibrary.findIndex((bookObject) => bookObject.id === parentCard.id);
        myLibrary.splice(bookObject, 1);
        displayBooks();
    }
});

