const UNCOMPLETED_LIST_ID = "books";
const COMPLETED_LIST_ID = "done-books";
const LIST_ITEMID = "itemId";

document.addEventListener("DOMContentLoaded", function () {
    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if(checkStorage()){
        loadDatafromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

function makeBook(title, author, year, isComplete) {
    const textTitle = document.createElement("h5");
    textTitle.classList.add("mb-0","d-flex")
    textTitle.innerText = title;

    const textAuthor = document.createElement("h6");
    textAuthor.classList.add("mb-0", "label-author")
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.classList.add("text-gray", "label-year")
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("text")
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("div");
    container.classList.add("item-book")
    container.append(textContainer);

    const flex = document.createElement("div");
    flex.classList.add("container-book", "mb-5")
    flex.append(container);

    if(isComplete){
        flex.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        flex.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return flex;
}

function createUndoButton() {
    return createButton("undo", " Belum", function(event){
        addToUncompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check", " Selesai", function(event){
        addToCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash", " Hapus", function(event){
        removeBook(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, buttonText, eventListener) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-sm", "btn-outline-dark", "ml-1", buttonTypeClass);
    button.textContent = buttonText;
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBook() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_ID);
    const listCompleted = document.getElementById(COMPLETED_LIST_ID);
    const id = +new Date();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = document.getElementById("isComplete");

    if (isComplete.checked){
      const book = makeBook(title, author, year, true);
      const bookStorage = makeBookStorage(title, author, year, true);
      book[LIST_ITEMID] = bookStorage.id;
      books.push(bookStorage);
      listCompleted.append(book);
    }else{
      const book = makeBook(title, author, year, false);
      const bookStorage = makeBookStorage(title, author, year, false);
      book[LIST_ITEMID] = bookStorage.id;
      books.push(bookStorage);
      listUncompleted.append(book);
    }

    updateDataToStorage();
}

function addToCompleted(bookElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_ID);
    const title = bookElement.querySelector(".text > h5").innerText;
    const author = bookElement.querySelector(".text > h6").innerText;
    const year = bookElement.querySelector(".text > p").innerText;

    const newBook = makeBook(title, author, year, true);
    const book = findBook(bookElement[LIST_ITEMID]);
    book.isCompleted = true;
    newBook[LIST_ITEMID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}

function addToUncompleted(bookElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_ID);
    const title = bookElement.querySelector(".text > h5").innerText;
    const author = bookElement.querySelector(".text > h6").innerText;
    const year = bookElement.querySelector(".text > p").innerText;

    const newBook = makeBook(title, author, year, false);
    const book = findBook(bookElement[LIST_ITEMID]);
    book.isCompleted = false;
    newBook[LIST_ITEMID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}

function removeBook(bookElement) {
    const bookPosition = findBookIndex(bookElement[LIST_ITEMID]);
    books.splice(bookPosition, 1);
    bookElement.remove();
    updateDataToStorage();
}

function makeChecked(checkbox){
    var check = "Selesai dibaca";
    var uncheck = "Belum selesai dibaca";

    checkBold.innerHTML = checkbox.checked ? "Masukkan ke rak " + check.bold() : "Masukkan ke rak " + uncheck.bold();
}
