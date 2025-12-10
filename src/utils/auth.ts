const token = "react-admin-token";
export const getToken = () => localStorage.getItem(token);

export const setToken = (value: string) => localStorage.setItem(token, value);
