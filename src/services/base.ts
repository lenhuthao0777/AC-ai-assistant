import Client from '@/lib/client';

class Base extends Client {
  endpoint = '';

  index<T>(params: any) {
    return this.get<T>(this.endpoint, { params }).then((res) => res.data);
  }

  show<T>(query: any) {
    return this.get<T>(`${this.endpoint}/${query}`);
  }

  store<T>(values: any) {
    return this.post<T>(this.endpoint, values);
  }

  update<T>(values: any) {
    return this.patch<T>(this.endpoint, values);
  }

  destroy<T>(query: any) {
    return this.delete<T>(`${this.endpoint}/${query}`);
  }
}

export default Base;
