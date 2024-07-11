import { csrfFetch } from './csrf';

const LOAD_TEAMS = 'teams/LOAD_TEAMS';
const ADD_TEAM = 'teams/ADD_TEAM';
const UPDATE_TEAM = 'teams/UPDATE_TEAM';
const DELETE_TEAM = 'teams/DELETE_TEAM';

const loadTeams = (teams) => ({
  type: LOAD_TEAMS,
  teams
});

const addTeam = (team) => ({
  type: ADD_TEAM,
  team
});

const updateTeam = (team) => ({
  type: UPDATE_TEAM,
  team
});

const deleteTeam = (teamId) => ({
  type: DELETE_TEAM,
  teamId
});

export const fetchTeams = () => async (dispatch) => {
  const response = await csrfFetch('/api/teams');
  if (response.ok) {
    const teams = await response.json();
    dispatch(loadTeams(teams));
  }
};

export const createTeam = (teamData) => async (dispatch) => {
  const response = await csrfFetch('/api/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamData)
  });

  if (response.ok) {
    const team = await response.json();
    dispatch(addTeam(team));
  }
};

export const editTeam = (teamData) => async (dispatch) => {
  const response = await csrfFetch(`/api/teams/${teamData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teamData)
  });

  if (response.ok) {
    const team = await response.json();
    dispatch(updateTeam(team));
  }
};

export const removeTeam = (teamId) => async (dispatch) => {
  const response = await csrfFetch(`/api/teams/${teamId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(deleteTeam(teamId));
  }
};

const initialState = {};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEAMS: {
      const newState = {};
      action.teams.forEach(team => {
        newState[team.id] = team;
      });
      return newState;
    }
    case ADD_TEAM: {
      return {
        ...state,
        [action.team.id]: action.team
      };
    }
    case UPDATE_TEAM: {
      return {
        ...state,
        [action.team.id]: action.team
      };
    }
    case DELETE_TEAM: {
      const updatedState = { ...state };
      delete updatedState[action.teamId];
      return updatedState;
    }
    default:
      return state;
  }
};

export default teamsReducer;