const API_URL = "http://localhost:3000";

export const getToken = () => localStorage.getItem("token");

export const authFetch = (url: string, options: RequestInit = {}) => {
  const token = getToken();

  return fetch(API_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};
