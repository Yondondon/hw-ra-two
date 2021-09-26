import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

function CreateSelectionForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const dispatch = useDispatch()
  const selections = useSelector(state => state.selections)
  const onSubmit = data => {
    dispatch({ type: "CREATE_SELECTION", payload: { 
      newSelection: { 
        title: data.selectionName, 
        author: data.selectionAuthor,
        email: data?.selectionAuthorEmail
      },
      isPending: true
    }})
    reset()
  }
  return (
    <div className="create_selection_form_wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="create_selection_form">
        <Form.Group className="create_selection_input" controlId="selectionName">
          <Form.Label>Selection name</Form.Label>
          <Form.Control {...register("selectionName", { required: true })} type="text" autoComplete="off" />
          {errors.selectionName && <span className="form_error">This field is required</span>}
        </Form.Group>
        <Form.Group className="create_selection_input" controlId="selectionAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control {...register("selectionAuthor", { required: true })} type="text" autoComplete="off" />
          {errors.selectionAuthor && <span className="form_error">This field is required</span>}
        </Form.Group>
        <Form.Group className="create_selection_input" controlId="selectionAuthorEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("selectionAuthorEmail")} type="email" autoComplete="off" />
          {errors.selectionAuthorEmail && <span className="form_error">This field is required</span>}
        </Form.Group>
        <div className="create_selection_form_add_btn_wrapper">
          { selections && selections.isPending ? 
            <Button type="button" onClick={(e) => {
              e.preventDefault()
              dispatch({ type: "CREATE_SELECTION_ABORTED" })
            }} variant="danger" className="create_selection_form_add_btn">Cancel</Button> 
            :
            <Button type="submit" variant="secondary" className="create_selection_form_add_btn">Create selection</Button> 
          }
        </div>
      </form>
    </div>
  )
}

export default CreateSelectionForm