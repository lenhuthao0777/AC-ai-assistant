import { debug } from './utils';

type TFetch = {
  url?: string;
  method?: string;
  body?: any;
};

export const Fetch = ({ url, method = 'GET', body }: TFetch): Promise<any> => {
  return fetch(`/api/${url}`, {
    method,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      debug(error);
      return error;
    });
};
