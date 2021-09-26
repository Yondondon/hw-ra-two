import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"

function SelectionControlForm() {
  const books = useSelector(state => state.books)
  const selections = useSelector(state => state.selections)
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const onSubmit = data => {
    clearErrors()
    let selection = selections.data.find(el => el._id === data.selectionId)
    //check if book is in selection
    if(selection.hasOwnProperty("books") && selection.books.find(el => el.toString() === data.bookId.toString()) !== undefined) {
      console.log("the book is in collection")
      setError("bookIsInSelectionError", {
        message: "This selection has already contain such book."
      })
      return;
    }
    data.bookId = [data.bookId]
    dispatch({ type: "ADD_BOOK_TO_SELECTION", payload: data })
  }
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="selection_control_wrap">
      <div className="selection_control_item">
        <label>Add a book</label>
        <Form.Select {...register("bookId", { required: true })} aria-label="Select book for add to selection">
          <option value="">Choose a book</option>
          { books.data && books.data.map((el, i) => {
            return <option key={i} value={el._id}>{el.title} by {el.author}</option>
          })}
        </Form.Select>
        {errors.bookId && <span className="form_error">Please choose a book</span>}
      </div>
      <div className="selection_control_item">
        <label>to selection</label>
        <Form.Select {...register("selectionId", { required: true })} aria-label="Select selection">
          <option value="">Choose a selection</option>
          { selections?.data && selections.data.map((el, i) => {
            return <option key={i} value={el._id}>{el.title} by {el.author}</option>
          })}
        </Form.Select>
        {errors.selectionId && <span className="form_error">Please choose a selection</span>}
      </div>
      <Button type="submit" onClick={() => clearErrors("bookIsInSelectionError")} variant="secondary" className="selection_control_add_btn">Add</Button>
    </form>
    { errors.bookIsInSelectionError && <div>{errors.bookIsInSelectionError.message}</div> }
    </>
  )
}

export default SelectionControlForm