import AsyncStorage from "@react-native-async-storage/async-storage";
import dataContext from "./DataContext";
import qs from "qs";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signin":
      return { errorMessage: "", user: action.payload };
    case "signout":
      return { errorMessage: "", user: null };
    case "clear_error_message":
      return { ...state, errorMessage: ""};
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
}

const signin = (dispatch) => async ({ username, password }) => {
  
  try {
    const response = await fetch("https://www.kino.dk/appservices/login-new", {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        username,
        password
      }),
    });
    const json = await response.json();
   
    // This needs to add an error message if login did not happen otherwise setItem user
    if (json.status) {
      dispatch({
        type: "add_error",
        payload: "Der gik noget galt",
      })
    } else {
      await AsyncStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'signin', payload: JSON.stringify(json) })
    }
    
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Der gik noget galt",
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('user')
  dispatch({ type: 'signout' })
}


const tryLocalSignin = dispatch => async () => {
  const userObject = await AsyncStorage.getItem('user')
  if (userObject) {
    const userObjectParsed = JSON.parse(userObject)

      const url = "https://www.kino.dk/appservices/account";
      fetch(url, {
        method: "GET",
        mode: "no-cors",
        credentials: "omit",
  
        headers: {
          cookie: `${userObjectParsed.session_name}=${userObjectParsed.session_id}`,
        },
      })
      .then((response) => response.json())
      .then((json) => {
        if (json === "false" ) {
          // delete user and and update state
          console.log("invalid token, deleting user")
          AsyncStorage.removeItem('user')
          dispatch({ type: 'signout' })
        } else {
          // If response returns data then user is valid and logged in
          // remember to update state so user can be fetched from auth context
          console.log("token is valid, update state with user")
          dispatch({ type: 'signin', payload: userObject })
        }
      })
  } else {
    console.log("bruger findes ikke i async")
    return false
  }
}

export const { Provider, Context } = dataContext(
  authReducer,
  { signin, signout, clearErrorMessage, tryLocalSignin },
  { user: null, errorMessage: "" }
);
