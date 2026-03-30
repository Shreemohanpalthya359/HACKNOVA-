import axios from "axios";

// 🔥 UPDATE THIS if backend URL changes
const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error) => {
  console.error("API Error:", error);
  return [];
};

// APIs
export const getSales = async () => {
  try {
    const res = await API.get("/sales");
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getRevenue = async () => {
  try {
    const res = await API.get("/revenue");
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getTopProducts = async () => {
  try {
    const res = await API.get("/top-products");
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};

export const getCustomers = async () => {
  try {
    const res = await API.get("/customers");
    return res.data;
  } catch (err) {
    return handleError(err);
  }
};