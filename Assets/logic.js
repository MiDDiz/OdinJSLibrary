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

	this.switchState = function() {
		console.log(`This is: ${this} and this.readstate = ${this.readState}`);

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
	// Hear me out
	// In each Render we clean the boook tbody in order to keep the order while we can delete and modigy
	// elements without keeping track of indexing. This way every time we modify something we re-render the table, or
	// more exactly we dynamicaly recreate the table with each Book object.
	//
	// Also, In order to insert buttons we need to handle what variables from the book are text ond what are functions that are
	// going to be atached to our buttons.

	bookTbody.innerHTML = '';
	console.log('Rendering');
	myLibrary.forEach((book) => {
		var newRow = bookTbody.insertRow();
		for (element in book) {
			let parsedElement;
			var newCell = newRow.insertCell();

			if (element === 'switchState') {
				parsedElement = document.createElement('BUTTON');
				parsedElement.innerHTML = 'SwitchState';
				parsedElement.addEventListener('click', () => {
					console.log('Trying to go to switch');
					book.switchState();
				});
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
