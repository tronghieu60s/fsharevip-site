/**
 * @param  {number} ms
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const delayValue = 1000;
export const delayLoading = () => delay(delayValue);

/**
 * @param  {any} obj
 * @returns any
 */
export const convertObjectToArray = (obj: any): any[] => {
  const arr: any = [];
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      arr.push({ key, value: obj[key] });
    }
  });
  return arr;
};