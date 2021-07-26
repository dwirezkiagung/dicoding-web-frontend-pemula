const STORAGE_KEY = 'BOOK_APPS';
let books = [];

const checkStorage = () => {
  if(typeof(Storage) == undefined) {
    alert('Your Browser not support web storage');
    return false;
  }

  return true;
}

const loadDatafromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);

  if(data !== null)
    books = data;

  document.dispatchEvent(new Event('ondataloaded'));
}

const makeBookStorage = (title, author, year, isCompleted) => {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  }
}

const saveData = () => {
  const parseData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parseData);
  document.dispatchEvent(new Event('ondatasaved'));
}

const updateDataToStorage = () => {
  if(checkStorage())
    saveData();
}

const findBook = (bookId) => {
  for (book of books) {
    if(book.id === bookId)
      return book;
  }

  return null;
}

const findBookIndex = (bookId) => {
  let index = 0
  for (book of books) {
    if(book.id === bookId)
      return index;

    index++;
  }

   return -1;
}

const refreshDataFromBooks = () => {
  const bookUncompleted = document.getElementById(UNCOMPLETED_LIST_ID);
  let bookCompleted = document.getElementById(COMPLETED_LIST_ID);

  for (book of books) {
    const newBook = makeBook(book.title, book.author, book.year , book.isCompleted);
    newBook[LIST_ITEMID] = book.id;

    if (book.isCompleted) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
}
