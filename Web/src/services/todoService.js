import http from "./http";
import { apiUrl } from "../config.json";

//----GET ALL---//
const getAll = () => {
  return http.get(`${apiUrl}/all`).then((resp) => resp.data);
};

//----DELETE---//
const deleteTodo = (_id) => {
  return http.delete(`${apiUrl}/${_id}`);
};

//----ADD---//
const createTodo = (todo) => {
  return http.post(`${apiUrl}/add`, todo);
};

//----EDIT---//
const editTodo = (todo) => {
  let todoID = todo._id;
  delete todo._id;
  return http.put(`${apiUrl}/edit/${todoID}`, todo);
};

const todoInfoByID = (_id) => {
  return http.get(`${apiUrl}/${_id}`).then((resp) => resp.data);
};

//----SEARCH---//
const searchValue = (val) => {
  return http.get(`${apiUrl}/search?q=${val}`).then((resp) => resp.data);
};

//----ORDER BY---//
const orderBy = (val) => {
  return http.get(`${apiUrl}/all?sort=${val}`).then((resp) => resp.data);
};

//----TIME FUNCTION---//
const timeConvert = (num) => {
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  let days = Math.floor(rhours / 24);
  let week = Math.floor(days / 7);
  return week
    ? week + "w "
    : days
    ? days + "d "
    : rhours
    ? rhours + " hrs "
    : rminutes + " mins ";
};

const service = {
  getAll,
  deleteTodo,
  createTodo,
  timeConvert,
  editTodo,
  todoInfoByID,
  searchValue,
  orderBy,
};

export default service;
