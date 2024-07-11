import { csrfFetch } from './csrf';

const LOAD_TEAM_STANDINGS = 'teamStandings/LOAD_TEAM_STANDINGS';
const ADD_TEAM_STANDING = 'teamStandings/ADD_TEAM_STANDING';
const UPDATE_TEAM_STANDING = 'teamStandings/UPDATE_TEAM_STANDING';
const DELETE_TEAM_STANDING = 'teamStandings/DELETE_TEAM_STANDING';

const loadTeamStandings = (teamStandings) => ({
  type: LOAD_TEAM_STANDINGS,
  teamStandings
});

const addTeamStanding = (teamStanding) => ({
  type: ADD_TEAM_STANDING,
  teamStanding
});

const updateTeamStanding = (teamStanding) => ({
  type: UPDATE_TEAM_STANDING,
  teamStanding
});

const deleteTeamStanding = (teamStandingId) => ({
  type: DELETE_TEAM_STANDING,
  teamStandingId
});

export const fetchTeamStandings = () => async (dispatch) => {
  const response = await csrfFetch('/api/team-standings');
  if (response.ok) {
    const teamStandings = await response.json();
    dispatch(loadTeamStandings(teamStandings));
  }
};

export const createTeamStanding = (teamStandingData) => async (dispatch) => {
  const response = await csrfFetch('/api/team-standings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamStandingData)
  });

  if (response.ok) {
    const teamStanding = await response.json();
    dispatch(addTeamStanding(teamStanding));
  }
};

export const editTeamStanding = (teamStandingData) => async (dispatch) => {
  const response = await csrfFetch(`/api/team-standings/${teamStandingData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamStandingData)
  });

  if (response.ok) {
    const teamStanding = await response.json();
    dispatch(updateTeamStanding(teamStanding));
  }
};

export const removeTeamStanding = (teamStandingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/team-standings/${teamStandingId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteTeamStanding(teamStandingId));
  }
};

const initialState = {};

const teamStandingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEAM_STANDINGS: {
      const newState = {};
      action.teamStandings.forEach(teamStanding => {
        newState[teamStanding.id] = teamStanding;
      });
      return newState;
    }
    case ADD_TEAM_STANDING: {
      return {
        ...state,
        [action.teamStanding.id]: action.teamStanding
      };
    }
    case UPDATE_TEAM_STANDING: {
      return {
        ...state,
        [action.teamStanding.id]: action.teamStanding
      };
    }
    case DELETE_TEAM_STANDING: {
      const updatedState = { ...state };
      delete updatedState[action.teamStandingId];
      return updatedState;
    }
    default:
      return state;
  }
};

export default teamStandingsReducer;