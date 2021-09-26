export const reducer = (state = { books: [], selections: { data: [] } }, action) => {
  switch (action.type) {
    case "FETCH_SELECTIONS_FULFILLED":
      return {
        ...state,
        selections: {
          ...state.selections,
          data: action.payload
        },
      }
    case "FETCH_BOOKS_FULLFILED":
      return {
        ...state,
        books: {
          ...state.books,
          data: action.payload
        }
      }
    case "REMOVE_BOOK_FROM_SELECTION":
      return {
        ...state,
        book: {
          selectionId: action.payload.selectionId, 
          bookId: action.payload.bookId
        }
      }
    case "CREATE_SELECTION":
      return {
        ...state,
        selections: {
          ...state.selections,
          ...action.payload,
        }
      }
    case "CREATE_SELECTION_FULFILLED":
      return {
        ...state,
        selections: {
          ...state.selections,
          isPending: false,
          newSelection: null
        }
      }
    case "CREATE_SELECTION_ABORTED":
      return {
        ...state,
        selections: {
          ...state.selections,
          isPending: false
        }
      }
    case "FETCH_BOOKS_REJECTED":
      return {
        ...state,
        modal: {
          ...state.modal,
          isShow: true
        },
        selections: {
          ...state.selections,
          isPending: false
        }
      }
    case "FETCH_SELECTIONS_REJECTED":
      return {
        ...state,
        modal: {
          ...state.modal,
          isShow: true
        },
        selections: {
          ...state.selections,
          isPending: false
        }
      }
    
    case "HIDE_ERROR_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          isShow: false
        }
      }
    default:
      return state
  }
}