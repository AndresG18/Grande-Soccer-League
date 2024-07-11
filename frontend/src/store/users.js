import { csrfFetch } from './csrf';

const LOAD_USERS = 'users/LOAD_USERS';

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
});

export const fetchUsers = () => async (dispatch) => {
  const response = await csrfFetch('/api/users');
  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
  }
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS: {
      const newState = {};
      action.users.forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default usersReducer;