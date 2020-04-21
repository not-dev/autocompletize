class Book {
  constructor () {
    this.title = 'abc'
  }

  setTitle (str) {
    this.title = str
  }
}

const books = {}
for (const book of ['eki-input', 'eki-input2']) {
  books[book] = new Book()
}

books['eki-input'].setTitle('xyz')

console.log(books)
