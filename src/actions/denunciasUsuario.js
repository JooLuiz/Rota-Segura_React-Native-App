import axios from "axios";
import {
  GET_DENUNCIAS_USUARIO,
  ADD_DENUNCIA_USUARIO,
  GET_ALL_DENUNCIAS,
  LOADING,
  LOADED,
  NOTIFY
} from "./types";
import { tokenConfig } from "./auth";

//GET Denuncia Usuario
export const getDenunciasUsuario = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  tokenConfig(getState).then(function(config) {
    axios
      .get("/usuario_denuncia/", config)
      .then(res => {
        dispatch({
          type: GET_DENUNCIAS_USUARIO,
          payload: res.data
        });
      })
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      )
      .finally(t => {
        dispatch({ type: LOADED });
      });
  });
};

//GET ALL Denuncia Usuario
export const getAllDenuncias = () => (dispatch, getState) => {
  dispatch({ type: LOADING });
  axios
    .get("/all_denuncias/")
    .then(res => {
      dispatch({
        type: GET_ALL_DENUNCIAS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    )
    .finally(t => {
      dispatch({ type: LOADED });
    });
};

//ADD Denuncia Usuario
export const addDenunciaUsuario = DenunciaUsuario => (dispatch, getState) => {
  dispatch({ type: LOADING });
  tokenConfig(getState)
    .then(function(config) {
      axios
        .post("/usuario_denuncia/", DenunciaUsuario, config)
        .then(res => {
          dispatch({
            type: ADD_DENUNCIA_USUARIO,
            payload: res.data
          });
          dispatch({
            type: NOTIFY,
            payload: {
              message: "Denuncia Cadastrada Com Sucesso",
              type: "success"
            }
          });
        })
        .catch(err => {
          dispatch({
            type: NOTIFY,
            payload: {
              message:
                "Ops, Algo errado Aconteceu,não foi possível concluir a ação",
              type: "error"
            }
          });
        });
    })
    .finally(t => {
      dispatch({ type: LOADED });
    });
};
