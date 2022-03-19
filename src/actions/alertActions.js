import { SHOW_ALERT, HIDE_ALERT } from "../types";

// muestra alerta
export function showAlert(alert) {
  return (dispatch) => {
    dispatch(createAlert(alert));
  };
}

const createAlert = (alert) => ({
  type: SHOW_ALERT,
  payload: alert,
});

//ocualtar alerta
export function hideAlertAction() {
  return (dispatch) => {
    dispatch(hideAlert());
  };
}

const hideAlert = () => ({
  type: HIDE_ALERT,
});
