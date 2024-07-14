import axios from "axios";
 
export const register = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/register",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/user/login",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/blisslist/addTask",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTask = async (id, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/blisslist/getTask/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllTasks = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/blisslist/getAllTasks",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const editTask = async (data, id, token) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v1/blisslist/editTask/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      } 
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/blisslist/deleteTask/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
