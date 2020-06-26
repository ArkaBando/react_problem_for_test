const initState = {
  cartCount:
    localStorage.getItem("cartCount") != undefined &&
    localStorage.getItem("cartCount") != null &&
    localStorage.getItem("cartCount") != "undefined"
      ? localStorage.getItem("cartCount")
      : 0,
  user:
    localStorage.getItem("user") != null &&
    localStorage.getItem("user") &&
    localStorage.getItem("user") != "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : undefined,
  notificationCount:
    localStorage.getItem("notificationCount") != undefined &&
    localStorage.getItem("notificationCount") != null &&
    localStorage.getItem("notificationCount") != "undefined"
      ? localStorage.getItem("notificationCount")
      : 0,
};

export const INCR_CART_COUNT = "INCR_CART_COUNT";
export const SET_USER = "SET_USER";
export const SET_NOTIF_COUNT = "SET_NOTIF_COUNT";

const rootReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "INCR_CART_COUNT":
      state = { cartCount: parseInt(state.cartCount) + 1 };
      localStorage.setItem("cartCount", parseInt(state.cartCount));
      return state;
    case "SET_USER":
      state = {
        user: action.payload,
        notificationCount: action.payload.notification_count,
      };
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem(
        "notificationCount",
        parseInt(action.payload.notification_count)
      );
      return state;
    case "SET_NOTIF_COUNT":
      state = { ...state, notificationCount: parseInt(action.payload) + 1 };
      localStorage.setItem(
        "notificationCount",
        parseInt(state.notificationCount)
      );
      return state;
    default:
      return state;
  }
};

export default rootReducer;

export function setCartCount(response) {
  return { type: INCR_CART_COUNT, payload: response };
}

export function setUser(response) {
  return { type: SET_USER, payload: response };
}

export function setNOTIF(response) {
  return { type: SET_NOTIF_COUNT, payload: response };
}
