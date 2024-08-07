import { addDatas, deleteDatas, getDatas, updateDatas } from "./firebaseGM";

//?  기본 reducer
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
  // *reducer는 항상 새로운 객체로  교체되어 주어야 작동한다.
  // !⭐---> 불변성 유지(있는 거에서 꺼냄 ? XX , 새로 가져옴!! == 주소가 바뀜), 이전 key값은 사라짐으로 key를 가져오지 않으면 사라진다.
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, items: action.payload, error: null };
    case ADD_ITEM:
      //   ...state 사용하지 않는 key를 살리기 위해 !  -> 만약 없다면 사용하지 않는 key가 삭제된다.
      return { ...state, items: [...state.items, action.payload], error: null };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        error: null,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.docId !== action.payload),
        error: null,
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
// Actions(실제 reducer가 state를 변경하기 전에 수행해야 할 작업들)
export const fetchItems = async (collectionName, queryOptions, dispatch) => {
  const resultData = await getDatas(collectionName, queryOptions);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: "Fetch Data 에러!!" });
  } else {
    dispatch({ type: FETCH_ITEMS, payload: resultData });
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
export const updateItems = async (
  collectionName,
  docId,
  updateObj,
  dispatch
) => {
  // firebaseGM.js 에서 updateDatas() 함수를 호출
  const resultData = await updateDatas(collectionName, docId, updateObj);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: "UPDATE Data 에러!!" });
    return;
  }
  // dispatch할때 type을 바꾸어주어야한다.
  dispatch({ type: UPDATE_ITEM, payload: resultData }); // dispatch할 action type, payload
};
export const deleteItems = async (collectionName, docId, dispatch) => {
  const resultData = await deleteDatas(collectionName, docId);
  if (!resultData) {
    dispatch({ type: SET_ERROR, payload: "DELETE Data 에러!!" });
    return;
  } else {
    dispatch({ type: DELETE_ITEM, payload: docId });
  }
};

// dispatch함수 ---> reducer함수로 !

//?  redux + store.js
