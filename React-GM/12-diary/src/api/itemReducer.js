import { addDatas, getDatas } from "./firebaseGM";

// action types
const FETCH_ITEMS = "FETCH_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM = "UPDATE_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const SET_ERROR = "SET_ERROR";

// Initial State
export const initialState = {
  items: [],
  error: null,
};

export function reducer(state, action) {
  // state는 우리가 dispatch 함수를 호출할 때 명시적으로 건네주지 않아도
  // reducer가  알아서 관리하고 있다. ex) state == initialState
  // dispatch 함수를 호출할 때 넣어주는 객체가 action 으로 들어온다.
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, error: null };
    case ADD_ITEM:
      //   ...state 사용하지 않는 key를 살리기 위해 !  -> 만약 없다면 사용하지 않는 key가 삭제된다.
      return { ...state, items: [...state.items, action.payload], error: null };
    case UPDATE_ITEM:
      return;
    case DELETE_ITEM:
      return;
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
// Actions(실제 reducer가 state를 변경하기 전에 수행해야 할 작업들)
export const fetchItems = async (collectionName, queryOptions, dispatch) => {
  const resultDate = await getDatas(collectionName, queryOptions);
  if (!resultDate) {
    dispatch({ type: SET_ERROR, payload: "Fetch Data 에러!!" });
  } else {
    dispatch({ type: FETCH_ITEMS, payload: resultDate });
  }
};
export const addItems = async (collectionName, addObj, dispatch) => {
  // dispatch 할 변경된 state 값을 만들어야한다.
  const resultData = await addDatas(collectionName, addObj);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: "ADD Data 에러!!" });
    return;
  }
  // dispatch 실행 시 reducer함수로 간다!
  dispatch({ type: ADD_ITEM, payload: resultData });
};
export const updateItems = async (collectionName, addObj) => {};
export const deleteItems = async (collectionName, addObj) => {};

// dispatch함수 ---> reducer함수로 !
