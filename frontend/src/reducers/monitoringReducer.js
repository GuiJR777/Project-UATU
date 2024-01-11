import {
    MONITORING_DELETE_REQUEST,
    MONITORING_DELETE_SUCCESS,
    MONITORING_DELETE_FAIL,
    MONITORING_EDIT_REQUEST,
    MONITORING_EDIT_SUCCESS,
    MONITORING_EDIT_FAIL,
    CREATE_MONITORING_REQUEST,
    CREATE_MONITORING_SUCCESS,
    CREATE_MONITORING_FAIL,
  } from '../constants/monitoringConstants';

  const initialState = {
    monitors: [],
  };

  export const monitoringReducer = (state = initialState, action) => {
    switch (action.type) {
      case MONITORING_DELETE_SUCCESS:
        return {
          ...state,
          monitors: state.monitors.filter((monitor) => monitor.id !== action.payload),
        };
      default:
        return state;
    }
  };

  export const monitoringEditReducer = (state = { editing: false }, action) => {
    switch (action.type) {
      case MONITORING_EDIT_REQUEST:
        return { editing: true };
      case MONITORING_EDIT_SUCCESS:
        return { editing: false, success: true, updatedMonitoring: action.payload };
      case MONITORING_EDIT_FAIL:
        return { editing: false, error: action.payload };
      default:
        return state;
    }
  };

  export const monitoringCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_MONITORING_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };

      case CREATE_MONITORING_SUCCESS:
        return {
          ...state,
          loading: false,
          createdMonitoring: action.payload,
        };

      case CREATE_MONITORING_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };
