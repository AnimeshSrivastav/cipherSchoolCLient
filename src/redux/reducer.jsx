export const initialState = {
  user:false,
  FirstName: "",
  LastName: "",
  email: "",
  follower: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        user:true,
        FirstName: action.item.firstName,
        LastName: action.item.lastName,
        email: action.item.email,
      };
    default:
      return state;
  }
};

export default reducer;
