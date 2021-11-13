const login =(data) => {
  // console.log(token);
  return {
    type: "LOGIN",
    payload: !data?._id ? {token:"",isAuth:false} :{token:"abcdefgh",isAuth:true}
  };
};

const logout = () => {
  return {
    type: "LOGOUT",
  };
};

const loadUser = () => {
  return {
    type: "LOAD_USER",
  };
};

export default {
  login,
  logout,
  loadUser,
};
