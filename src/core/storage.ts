import { getCookie, setCookie } from 'cookies-next';
import { STORAGE_AUTH, STORAGE_LOCAL_STORAGE } from '../const/storage';

const processInput = (input: any) => {
  if (input instanceof Date) {
    return JSON.stringify(input.getTime());
  }
  return JSON.stringify(input);
};

const processOutput = (output: any) => {
  if (output === null) {
    return output;
  }
  let result;
  try {
    result = JSON.parse(output);
  } catch (e) {
    result = output;
  }
  return result;
};

export const getAuth = () => {
  const result = getCookie(STORAGE_AUTH);
  return processOutput(result);
};

export const setAuth = (resource = {}) => {
  const result = processInput(resource);
  setCookie(STORAGE_AUTH, result);
};

export const getLocalStorage = () => {
  const result = localStorage.getItem(STORAGE_LOCAL_STORAGE);
  return processOutput(result);
};

export const setLocalStorage = (resource = {}) => {
  const result = processInput(resource);
  localStorage.setItem(STORAGE_LOCAL_STORAGE, result);
};