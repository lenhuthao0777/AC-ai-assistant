import Base from '../base';

class AuthService extends Base {
  endpoint = 'auth/';

  signUp(values: any): Promise<any> {
    return this.post(`${this.endpoint}/signup`, values);
  }
}

export default AuthService;
