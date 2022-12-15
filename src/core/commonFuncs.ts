/**
 * @param  {number} ms
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const delayValue = 1000;
export const delayLoading = () => delay(delayValue);

/**
 * @param  {object} obj
 */
export const isEmptyObject = (obj: object | null) => {
  if (obj) {
    return Object.keys(obj).length === 0;
  }
  return true;
};
