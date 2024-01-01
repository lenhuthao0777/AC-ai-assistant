import { debug } from './utils';

type TFetch = {
  url?: string;
  method?: string;
  body?: any;
};

export const Fetch = ({ url, method = 'GET', body }: TFetch): Promise<any> => {
  return fetch(`api/${url}`, {
    method,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body,
  })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      debug(error);
      return error;
    });
};
