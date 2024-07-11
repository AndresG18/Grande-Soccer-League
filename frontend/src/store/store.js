import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './users'; 
import teamsReducer from './teams'; 
import teamStandingsReducer from './teamStandings'; 
import gamesReducer from './games'; 

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer, 
  teams: teamsReducer, 
  teamStandings: teamStandingsReducer, 
  games: gamesReducer 
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;