import { csrfFetch } from './csrf';

const ADD_CHILD = 'children/ADD_CHILD';
const SET_CHILDREN = 'children/SET_CHILDREN';
const REMOVE_CHILD = 'children/REMOVE_CHILD';

const addChild = (child) => ({
  type: ADD_CHILD,
  child,
});

const setChildren = (children) => ({
  type: SET_CHILDREN,
  children,
});

const removeChild = (childId) => ({
  type: REMOVE_CHILD,
  childId,
});

export const createChild = (coachId, child) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${coachId}/children`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(child),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addChild(data));
    return data;
  }
};

export const fetchChildren = (coachId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${coachId}/children`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setChildren(data));
    return data;
  }
};

export const deleteChild = (childId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/children/${childId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(removeChild(childId));
    return response;
  }
};

const initialState = {};


const childrenReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CHILDREN: {
        const newState = {};
        action.children.forEach((child) => {
          newState[child.id] = child;
        });
        return newState;
      }
      case ADD_CHILD: {
        const newState = {
          ...state,
          [action.child.id]: action.child,
        };
        return newState;
      }
      case REMOVE_CHILD: {
        const newState = { ...state };
        delete newState[action.childId];
        return newState;
      }
      default:
        return state;
    }
  };
  
  export default childrenReducer;