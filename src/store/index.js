import { configureStore } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  token: "",
  user: {},
};

// Define a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "login":
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "logout":
      return {
        ...state,
        token: "",
        user: {},
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = configureStore({ reducer });

export default store;
