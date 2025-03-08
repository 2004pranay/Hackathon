// eslint-disable-next-line import/prefer-default-export
export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
};
