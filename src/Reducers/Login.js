const initialState = {
  user: "",
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem("isAuth"),
};

console.log(initialState);

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER":
      console.log(state.token);
      return {
        ...state,
      };
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("isAuth", action.payload.isAuth);
      return {
        ...state,
        token: action.payload.token,
        isAuth: action.payload.isAuth,
      };

    case "LOGOUT":
      localStorage.clear();

      return { ...state, token: "", isAuth: false };
    default:
      return state;
  }
}
export default LoginReducer;
