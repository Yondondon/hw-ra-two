import { Accordion, Button } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import Book from "../Book/Book";

const Selection = (props) => {
  const { item } = props
  const dispatch = useDispatch()
  return (
    <>
      <Accordion.Item eventKey={props.itemKey}>
        <Accordion.Header>
          <span>
            <strong>{item.title}</strong> by <i>{item.author}</i>
          </span>
        </Accordion.Header>
        <Accordion.Body>
          {item.books && item?.books.map((el, i) => {
            return <Book selectionId={item._id} bookId={el[0]} key={i} />
          })}
          <Button onClick={() => {
              dispatch({ type: "REMOVE_SELECTION", payload: item._id })
            }} className="remove_selection_btn" variant="outline-danger" size="sm">Delete selection</Button>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
}

export default Selection