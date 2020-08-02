interface ResponseProps {
  success: boolean;
  data?: any;
  message?: string;
}

const ResponseWrapper = (
  success: boolean,
  data: string | any
): ResponseProps => {
  const _data =
    ["string", "number"].indexOf(typeof data) >= 0 ? { message: data } : data;
  return {
    ..._data,
    isSuccess: success,
  };
};

export default ResponseWrapper;
