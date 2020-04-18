import { GET_LISTS, SET_LISTS, SET_LIST_SHOW_DONE_ITEMS } from './lists.action-constants'
import { IList } from "shared";

interface GetListsAction {
  type: typeof GET_LISTS
}
interface SetListsAction {
  type: typeof SET_LISTS,
  payload: IList[];
}
interface SetListShowDoneItemsAction {
  type: typeof SET_LIST_SHOW_DONE_ITEMS,
  payload: { listId: number, showDoneItems: boolean };
}
export type ListsActionTypes = GetListsAction | SetListsAction | SetListShowDoneItemsAction

export interface SystemState {
  lists: {
    collection: IList[],
    loading: boolean
  }
}
