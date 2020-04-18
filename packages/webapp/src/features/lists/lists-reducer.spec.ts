import { GET_LISTS, SET_LISTS, SET_LIST_SHOW_DONE_ITEMS } from './lists.action-constants'
import listsReducer from './lists.reducer'
import { ListsActionTypes } from './list.action-types'
import { IList } from "shared";

const testList: IList = {
  id: 1,
  name: "Test list",
  description: "",
  userId: 1,
  listGroupId: 1,
  showDoneItems: false,
  createdBySystem: true
};

const testList2: IList = {
  id: 2,
  name: "Test list",
  description: "",
  userId: 1,
  listGroupId: 1,
  showDoneItems: false,
  createdBySystem: true
};

describe('features > lists > listsReducer', () => {
  it(`sets loading to true, if ${GET_LISTS} action is provided`, () => {
    const initialState = {
      collection: [],
      loading: false
    }

    const expectedState = {
      collection: [],
      loading: true
    }

    const action: ListsActionTypes = {
      type: GET_LISTS
    }
    expect(listsReducer(initialState, action)).toEqual(expectedState)
  })

  it(`sets loading to false and reduces a list, if ${SET_LISTS} action is provided`, () => {
    const initialState = {
      collection: [],
      loading: true
    }

    const expectedState = {
      collection: [
        testList
      ],
      loading: false
    }
    const action: ListsActionTypes = {
      type: SET_LISTS,
      payload: [ testList ]
    }

    expect(listsReducer(initialState, action)).toEqual(expectedState)
  })

  it(`replaces the collection of lists whenever ${SET_LISTS} action is provided`, () => {
    const initialState = {
      collection: [ testList, testList, testList, testList ],
      loading: true
    }

    const expectedState1 = {
      collection: [
        testList
      ],
      loading: false
    }
    const expectedState2 = {
      collection: [],
      loading: false
    }
    const expectedState3 = {
      collection: [
        testList, testList, testList
      ],
      loading: false
    }
    let action: ListsActionTypes = {
      type: SET_LISTS,
      payload: [ testList ]
    }
    expect(listsReducer(initialState, action)).toEqual(expectedState1)
    
    action = {
      type: SET_LISTS,
      payload: []
    }
    expect(listsReducer(expectedState1, action)).toEqual(expectedState2)

    action = {
      type: SET_LISTS,
      payload: [testList, testList, testList]
    }
    expect(listsReducer(expectedState2, action)).toEqual(expectedState3)
  })

  it(`updates the setShowDoneItems flag in list with given ID whenever ${SET_LIST_SHOW_DONE_ITEMS} action is provided`, () => {
    const initialState = {
      collection: [ testList, testList2 ],
      loading: false
    }

    let updatedList = { ...testList };
    updatedList.showDoneItems = true;
    const expectedState = {
      collection: [ updatedList, testList2 ],
      loading: false
    }

    let correctAction: ListsActionTypes = {
      type: SET_LIST_SHOW_DONE_ITEMS,
      payload: { listId: 1, showDoneItems: true }
    }
    expect(listsReducer(initialState, correctAction)).toEqual(expectedState)

    let correctActionReverse: ListsActionTypes = {
      type: SET_LIST_SHOW_DONE_ITEMS,
      payload: { listId: 1, showDoneItems: false }
    }
    updatedList = { ...testList };
    updatedList.showDoneItems = false;
    expect(listsReducer(expectedState, correctActionReverse)).toEqual(initialState)

    let actionWithNotFoundId: ListsActionTypes = {
      type: SET_LIST_SHOW_DONE_ITEMS,
      payload: { listId: 123, showDoneItems: false }
    }
    expect(listsReducer(initialState, actionWithNotFoundId)).toEqual(initialState)
  })
})
