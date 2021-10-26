import axios from "axios";

// Default Headers
export const defaultHeaders = {
  "Content-Type": "application/json;charset=utf-8"
};

// Initiate a new instance with Defaults
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: defaultHeaders
});
