import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

function Book(props) {
  const { bookId, selectionId } = props
  const dispatch = useDispatch()
  const books = useSelector(state => state.books)
  let book = {}
  if(books.data) {
    book = books.data.filter(el => el._id === bookId)[0]
  }
  return (
    <div className="selection_list_item">
      <span><strong>{book?.title}</strong> by {book?.author}</span>
      <Button onClick={() => {
        dispatch({ type: "REMOVE_BOOK_FROM_SELECTION", payload: {bookId: bookId, selectionId: selectionId} })
      }} variant="outline-danger" size="sm">Delete</Button>
    </div>
  )
}

export default Book