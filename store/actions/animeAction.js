import { SET_SELECTED_ANIME } from "../actionTypes";

export const setSelectedAnimeAction = async (dispatch, data) => {
  try {
    dispatch({
      type: SET_SELECTED_ANIME,
      payload: data,
    });
  } catch (err) {
    return { message: err.message };
  }
};
