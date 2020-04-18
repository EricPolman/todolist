import { SET_LISTS, GET_LISTS, SET_LIST_SHOW_DONE_ITEMS } from './lists.action-constants'
import { ListsActionTypes } from './list.action-types'
import { IList } from "shared"

interface StateType {
  collection: IList[],
  loading: boolean
}

const initialState: StateType = {
  collection: [],
  loading: false
}

export default (state = initialState, action: ListsActionTypes) => {
  switch (action.type) {
    case GET_LISTS:
      return { ...state, loading: true }
    case SET_LISTS:
      return { ...state, loading: false, collection: action.payload }
    case SET_LIST_SHOW_DONE_ITEMS:
      const listIndex = state.collection.findIndex(list => list.id === action.payload.listId);
      if (listIndex === -1) {
        return state;
      }
      const collection = [...(state.collection || [])];
      collection[listIndex] = {...collection[listIndex], showDoneItems: action.payload.showDoneItems};

      return { ...state, loading: false, collection }
    default:
      return state
  }
}
