import axios from 'axios';
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

export const deleteMonitoring = (monitoringId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MONITORING_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`http://127.0.0.1:8000/app/monitorings/${monitoringId}/delete`, config);

    dispatch({ type: MONITORING_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: MONITORING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const editMonitoring = (id, updatedData) => async (dispatch, getState) => {
  try {
    dispatch({ type: MONITORING_EDIT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`http://127.0.0.1:8000/app/monitorings/${id}/update/`, updatedData, config);

    dispatch({
      type: MONITORING_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MONITORING_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const createMonitoring = (monitorData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_MONITORING_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    monitorData.intervalo_atualizacao = monitorData.intervalo_atualizacao * 60;

    const response = await axios.post('http://127.0.0.1:8000/app/monitorings/create/', monitorData, config);

    dispatch({
      type: CREATE_MONITORING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MONITORING_FAIL,
      payload: error.response ? error.response.data : 'Erro desconhecido',
    });
  }
};
