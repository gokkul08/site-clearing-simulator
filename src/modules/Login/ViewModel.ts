import Router from 'next/router';

class LoginModel {
    readonly buttonText: string = 'Login';

    constructor() {}

    handleLoginButton = (): void => {
        Router.push('/api/login');
    };
}

export default LoginModel;