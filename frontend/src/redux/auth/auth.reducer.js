import auth_types from "./auth.types";
const INTIAL_STATE = {
  token: null,
  userId: null,
  email: null,
  displayName: null,
  tokenExpriration: null,
  auth_state: false,
  errMassage : ""
};
const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case auth_types.SIGN_IN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        auth_state: true,
        errMassage : ""
      };

    case auth_types.SIGN_IN_FAIL:
      return {
        ...state,
        ...INTIAL_STATE,
        errMassage : action.payload,
        auth_state: false,
      };
    case auth_types.SIGN_OUT:
      return {
        ...INTIAL_STATE,
      };
    default:
      return state;
  }
};
export default authReducer;
