import { useState } from 'react';

import AuthApi from '../../api/auth';


const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const HandleSubmit = event => {
        event.preventDefault();
        AuthApi.requestBearerToken(username, password)
    };

    return (
        <form onSubmit={HandleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
