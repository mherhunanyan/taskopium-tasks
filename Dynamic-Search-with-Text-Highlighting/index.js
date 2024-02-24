const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949 },
];

function createTextWithHighlight(text, term) {
  const node = document.createDocumentFragment();
  if (!term) {
    node.appendChild(document.createTextNode(text));
  } else {
    const regex = new RegExp(`(${term})`, 'gi');
    let matchIndex = 0;
    text.replace(regex, (match, p1, offset) => {
      node.appendChild(document.createTextNode(text.substring(matchIndex, offset)));
      const highlightSpan = document.createElement('span');
      highlightSpan.classList.add('highlight');
      highlightSpan.textContent = match;
      node.appendChild(highlightSpan);
      // Update the last match index
      matchIndex = offset + match.length;
    });
    // Append the text after the last match
    if (matchIndex < text.length) {
      node.appendChild(document.createTextNode(text.substring(matchIndex)));
    }
  }
  return node;
}



function displayBooks(books, searchTerm = "") {
  const bookListContainer = document.getElementById("book-list");
  bookListContainer.textContent = "";
  
  if (books.length === 0) {
    bookListContainer.textContent = "No books found";
    return;
  }
  
  const ul = document.createElement("ul");
  books.forEach((book) => {
    const li = document.createElement("li");

    const titleElement = document.createElement("h2");
    const authorElement = document.createElement("p");
    const yearElement = document.createElement("p");
    const idElement = document.createElement("p");

    titleElement.appendChild(createTextWithHighlight(`Title: ${book.title}`, searchTerm));
    authorElement.appendChild(createTextWithHighlight(`Author: ${book.author}`, searchTerm));
    yearElement.appendChild(createTextWithHighlight(`Year: ${book.year}`, searchTerm));
    idElement.appendChild(document.createTextNode(`ID: ${book.id}`));

    li.appendChild(titleElement);
    li.appendChild(authorElement);
    li.appendChild(yearElement);
    li.appendChild(idElement);

    ul.appendChild(li);
  });
  bookListContainer.appendChild(ul);
}

function filterBooks(query) {
  const lowerCaseQuery = query.toLowerCase();

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.year.toString().toLowerCase().includes(lowerCaseQuery)
  );

  displayBooks(filteredBooks, query);
}

document.getElementById("search-box").addEventListener("input", function () {
  filterBooks(this.value);
});

displayBooks(books);
