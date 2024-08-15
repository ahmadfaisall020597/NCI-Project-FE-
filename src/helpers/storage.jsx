import { decryptData, encryptData } from "./crypto";

const setAuthorization = (data) => {
  try {
    const encryptedData = encryptData(JSON.stringify(data));
    localStorage.setItem("authorization", encryptedData);
    return true;
  } catch (error) {
    return false;
  }
};

const getAuthorization = () => {
  try {
    const encryptedData = localStorage.getItem("authorization");
    if (!encryptedData) return null;

    const token = decryptData(encryptedData);
    return JSON.parse(token);
  } catch (error) {
    return null;
  }
};

export { setAuthorization, getAuthorization };
