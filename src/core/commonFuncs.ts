/**
 * @param  {number} ms
 */
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const delayValue = 1000;
export const delayLoading = () => delay(delayValue);
