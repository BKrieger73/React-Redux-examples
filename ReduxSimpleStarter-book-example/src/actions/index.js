export function selectBook(book){
  console.log('Abook has been selected:', book.title);
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}
