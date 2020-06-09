//DOM Variables

const bookTitleTxt = document.getElementById('book-title');
const bookAuthorTxt = document.getElementById('book-author');
const bookPages = document.getElementById('book-pages');
const readStatusRadios = document.getElementsByName('status');
const appendBookBtn = document.getElementById('AddBook');

const bookTable = document.getElementById('book-table');
const bookTbody = document.getElementById('book-tbody');

let myLibrary = [];
// Book constructor
function Book(title, author, pages, readState) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.readState = readState;

	// This might fail
	this.switchState = function() {
		if (this.readState === 'Read') {
			this.readState = 'Not Read';
		} else {
			this.readState = 'Read';
		}
		Render();
	};
}

function addBookToLibrary() {
	//Ask for user input

	const title = bookTitleTxt.value;
	const author = bookAuthorTxt.value;
	const pages = parseInt(bookPages.value);

	if (isNaN(pages)) {
		alert('Number of pages not valid!');
		bookPages.value = '';
		return;
	}
	clearForms();

	var read;
	readStatusRadios.forEach((radio) => {
		if (radio.checked) read = radio.value;
	});

	const newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);

	// DEBUG CODE
	showBookList();
	//
	Render();
}

// DEBUG CODE
function showBookList() {
	console.table(myLibrary);
}
//

function clearForms() {
	bookTitleTxt.value = '';
	bookAuthorTxt.value = '';
	bookPages.value = '';
}

function Render() {
	// What we do is clear first the elements of the tbody of books in order to
	bookTbody.innerHTML = '';
	console.log('Rendering');
	myLibrary.forEach((book) => {
		var newRow = bookTbody.insertRow();
		for (element in book) {
			let parsedElement;
			var newCell = newRow.insertCell();

			console.log(book[element]);
			if (element == 'switchState') {
				parsedElement = document.createElement('BUTTON');
				parsedElement.innerHTML = 'SwitchState';
				parsedElement.addEventListener('click', book.switchState());
			} else if ((element = '')) {
				parsedElement = document.createTextNode('WIP');
			} else {
				parsedElement = document.createTextNode(book[element]);
			}

			newCell.appendChild(parsedElement);
		}
	});
}

appendBookBtn.addEventListener('click', () => {
	addBookToLibrary();
});

// Init render
