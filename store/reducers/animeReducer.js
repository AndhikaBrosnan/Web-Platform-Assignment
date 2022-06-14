import { SET_SELECTED_ANIME } from "../actionTypes";

const initialState = {
  selectedAnimes: [],
};

function bannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ANIME:
      return { ...state, selectedAnimes: action.payload };

    default:
      return state;
  }
}

export default bannerReducer;
