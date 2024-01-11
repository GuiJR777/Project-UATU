import {
    PRICE_MONITOR_LIST_REQUEST,
    PRICE_MONITOR_LIST_SUCCESS,
    PRICE_MONITOR_LIST_FAIL,
  } from '../constants/priceMonitoringConstants';

  export const priceMonitorListReducer = (state = { monitors: [] }, action) => {
    switch (action.type) {
      case PRICE_MONITOR_LIST_REQUEST:
        return { loading: true, monitors: [] };
      case PRICE_MONITOR_LIST_SUCCESS:
        return { loading: false, monitors: action.payload };
      case PRICE_MONITOR_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
