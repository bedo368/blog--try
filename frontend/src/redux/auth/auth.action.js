import axios from "axios";
import auth_types from "./auth.types";
export const sign_in_async = (email, password) => {
  return (dispatch) => {
    const query = `query{
            login(email:"${email}" password:"${password}"  ){
                token
                tokenExpriration
                email
                displayName
                userId

            }
          }`;
    axios({
      url: "http://localhost:5000/graphql",
      method: "POST",
      data: {
        query: query,
      },
    })
      .then((res) => {
        dispatch(sign_in_success(res.data.data.login));

        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.errors[0].message);
        dispatch(sign_in_fail(err.response.data.errors[0].message));
      });
  };
};
const sign_in_success = (authdata) => {
  return {
    type: auth_types.SIGN_IN_SUCCESS,
    payload: authdata,
  };
};
const sign_in_fail = (err) => {
  return {
    type: auth_types.SIGN_IN_FAIL,
    payload: err,
  };
};
export const sign_out = () => {
  return {
    type: auth_types.SIGN_OUT,
  };
};

export const signUpAsync = (email, password ,firstName ,lastName ) => {
  return (dispatch) => {
    const query = `mutation{
            createUser(email:"${email}" password:"${password}" displayName:"${firstName} ${lastName}" ){
                _id
               
            }
          }`;
    axios({
      url: "http://localhost:5000/graphql",
      method: "POST",
      data: {
        query: query,
      },
    }).then((res) => {
      const query = `query{
            login(email:"${email}" password:"${password}"  ){
                token
                tokenExpriration
                email
                displayName
                userId

            }
          }`;
      axios({
        url: "http://localhost:5000/graphql",
        method: "POST",
        data: {
          query: query,
        },
      })
        .then((res) => {
          dispatch(sign_in_success(res.data.data.login));

          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data.errors[0].message);
          dispatch(sign_in_fail(err.response.data.errors[0].message));
        });
    });
  };
};
