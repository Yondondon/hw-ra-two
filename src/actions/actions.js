import { ajax } from 'rxjs/ajax'
import { switchMap, map, mergeMap, takeUntil, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { serverUrl } from '../index.js'

export const fetchSelectionsEpic = action$ => action$.pipe(
  ofType('FETCH_SELECTIONS'),
  switchMap(action => 
    ajax.getJSON(`${serverUrl}/selections`).pipe(
      map(res => fetchSelectionsFulfilled(res)),
      catchError(error => of(fetchSelectionsRejected(error)))
    )
  )
)

export const fetchBooksEpic = action$ => action$.pipe(
  ofType("FETCH_BOOKS"),
  mergeMap(action => 
    ajax.getJSON(`${serverUrl}/books`).pipe(
      map(res => fetchBooksFulfilled(res)),
      catchError(error => of(fetchBooksRejected(error)))
    )
  )
)

export const removeBookFromSelectionEpic = action$ => action$.pipe(
  ofType("REMOVE_BOOK_FROM_SELECTION"),
  mergeMap(action => 
    ajax.delete(`${serverUrl}/selections/${action.payload.selectionId}/books/${action.payload.bookId}`).pipe(
      map(res => removeBookFromSelectionFulFilled(res)),
      map(() => fetchSelections())
    )
  )
)

export const removeSelectionEpic = action$ => action$.pipe(
  ofType("REMOVE_SELECTION"),
  mergeMap(action => 
    ajax.delete(`${serverUrl}/selections/${action.payload}`).pipe(
      map(res => removeSelectionFulFilled(res)),
      map(() => fetchSelections())
    )
  )
)

export const addBookToSelectionEpic = action$ => action$.pipe(
  ofType("ADD_BOOK_TO_SELECTION"),
  switchMap(action => 
    ajax.post(
      `${serverUrl}/selections/${action.payload.selectionId}/books`,
      action.payload.bookId
      ).pipe(
      mergeMap(() => [addBookToSelectionFulFilled(), fetchSelections()])
    )
  )
)

export const createSelectionEpic = action$ => action$.pipe(
  ofType("CREATE_SELECTION"),
  switchMap(action => 
    ajax.post(
      `${serverUrl}/selections`,
      action.payload.newSelection
      ).pipe(
        mergeMap((data) => [createSelectionFulFilled(), fetchSelections()]),
        takeUntil(action$.pipe(ofType("CREATE_SELECTION_ABORTED"))),
        catchError(error => of(fetchSelections()))
    )
  ),
)

//action creators
export const fetchSelections = () => ({ type: "FETCH_SELECTIONS" })
export const fetchSelectionsFulfilled = payload => ({ type: "FETCH_SELECTIONS_FULFILLED", payload: payload })
export const fetchSelectionsRejected = (payload) => ({ type: "FETCH_SELECTIONS_REJECTED", payload: payload })

export const fetchBooks = id => ({ type: "FETCH_BOOKS", payload: id })
export const fetchBooksFulfilled = payload => ({ type: "FETCH_BOOKS_FULLFILED", payload: payload })
export const fetchBooksRejected = payload => ({ type: "FETCH_BOOKS_REJECTED", payload: payload })

export const removeBookFromSelection = () => ({ type: "REMOVE_BOOK_FROM_SELECTION" })
export const removeBookFromSelectionFulFilled = () => ({ type: "REMOVE_BOOK_FROM_SELECTION_FULFILLED"})

export const removeSelection = () => ({ type: "REMOVE_SELECTION" })
export const removeSelectionFulFilled = () => ({ type: "REMOVE_SELECTION_FULFILLED"})

export const addBookToSelection = () => ({ type: "ADD_BOOK_TO_SELECTION" })
export const addBookToSelectionFulFilled = () => ({ type: "ADD_BOOK_TO_SELECTION_FULFILLED"})

export const createSelection = (payload) => ({ type: "CREATE_SELECTION", payload: payload })
export const createSelectionFulFilled = () => ({ type: "CREATE_SELECTION_FULFILLED" })
export const createSelectionAborted = () => ({ type: "CREATE_SELECTION_ABORTED"})

//rootEpic
export const rootEpic = combineEpics(
  fetchSelectionsEpic,
  fetchBooksEpic,
  removeBookFromSelectionEpic,
  removeSelectionEpic,
  addBookToSelectionEpic,
  createSelectionEpic
)