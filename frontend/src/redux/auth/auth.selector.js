import { createSelector } from "reselect";

const authDataSelector = (state) => state.authdata;

export const authStateSelector = createSelector([authDataSelector], (authData) => {
  return authData.auth_state;
});


export const tokenSelector = createSelector([authDataSelector], (authData) => {
  return authData.token;
});
