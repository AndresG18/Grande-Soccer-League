import { csrfFetch } from './csrf';

const LOAD_GAMES = 'games/LOAD_GAMES';
const ADD_GAME = 'games/ADD_GAME';
const UPDATE_GAME = 'games/UPDATE_GAME';
const DELETE_GAME = 'games/DELETE_GAME';

const loadGames = (games) => ({
  type: LOAD_GAMES,
  games
});

const addGame = (game) => ({
  type: ADD_GAME,
  game
});

const updateGame = (game) => ({
  type: UPDATE_GAME,
  game
});

const deleteGame = (gameId) => ({
  type: DELETE_GAME,
  gameId
});

export const fetchGames = () => async (dispatch) => {
  const response = await csrfFetch('/api/games');
  if (response.ok) {
    const games = await response.json();
    dispatch(loadGames(games));
  }
};

export const createGame = (gameData) => async (dispatch) => {
  const response = await csrfFetch('/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  });

  if (response.ok) {
    const game = await response.json();
    dispatch(addGame(game));
  }
};

export const editGame = (gameData) => async (dispatch) => {
  const response = await csrfFetch(`/api/games/${gameData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  });

  if (response.ok) {
    const game = await response.json();
    dispatch(updateGame(game));
  }
};

export const removeGame = (gameId) => async (dispatch) => {
  const response = await csrfFetch(`/api/games/${gameId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteGame(gameId));
  }
};

const initialState = {};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAMES: {
      const newState = {};
      action.games.forEach(game => {
        newState[game.id] = game;
      });
      return newState;
    }
    case ADD_GAME: {
      return {
        ...state,
        [action.game.id]: action.game
      };
    }
    case UPDATE_GAME: {
      return {
        ...state,
        [action.game.id]: action.game
      };
    }
    case DELETE_GAME: {
      const updatedState = { ...state };
      delete updatedState[action.gameId];
      return updatedState;
    }
    default:
      return state;
  }
};

export default gamesReducer;