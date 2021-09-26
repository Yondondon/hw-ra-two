import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';

//components
import Selection from './components/Selection/Selection';
import SelectionControlForm from './components/SelectionControlForm/SelectionControlForm';
import CreateSelectionForm from './components/CreateSelectionForm/CreateSelectionForm'
import ErrorModal from "./components/ErrorModal/ErrorModal"

//styles
import './App.css';

function App() {
  const selections = useSelector(state => state.selections)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({type: "FETCH_SELECTIONS"})
    dispatch({type: "FETCH_BOOKS"})
  }, [])
  return (
    <>
    <div className="wrapper">
      <h2 className="page_title">Selections</h2>
      <CreateSelectionForm />
      <SelectionControlForm />
      { selections?.data.length > 0 && (
        <Accordion>
          {selections.data.map((el,i) => {
            return <Selection key={i} item={el} itemKey={i} />
          })}
        </Accordion>
      )}
    </div>
    <ErrorModal />
    </>
  );
}

export default App;
