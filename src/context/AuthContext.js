import AsyncStorage from "@react-native-async-storage/async-storage";
import dataContext from "./DataContext";
import qs from "qs";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { ...state, errorMessage: "", user: action.payload };
    case "signout":
      return { user: null, errorMessage: ''}
    case "clear_error_message":
      return { ...state, errorMessage: ''}
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

export const { Provider, Context } = dataContext(
  authReducer,
  { signin, signout, clearErrorMessage },
  { user: null, errorMessage: "" }
);
