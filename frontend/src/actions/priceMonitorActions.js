import axios from 'axios';
import {
  PRICE_MONITOR_LIST_REQUEST,
  PRICE_MONITOR_LIST_SUCCESS,
  PRICE_MONITOR_LIST_FAIL,
} from '../constants/priceMonitoringConstants';

export const listPriceMonitors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRICE_MONITOR_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('http://127.0.0.1:8000/app/monitorings', config);

    dispatch({ type: PRICE_MONITOR_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRICE_MONITOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};