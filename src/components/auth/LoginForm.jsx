import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Message from 'react-bootstrap/Alert';

import AuthApi from '../../api/auth';


const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const HandleSubmit = event => {
        event.preventDefault();
        AuthApi.requestBearerToken(username, password)
            .then((result) => {
                // console.log('requestBearerToken() ->', typeof result, result)
                if (result.success) {
                    setMessage('LoginForm: token received');
                } else {
                    setMessage('LoginForm: login failed');
                }
            });
    };

    const HandleVerify = event => {
        event.preventDefault();
        AuthApi.verifyToken()
            .then((result) => {
                console.log('verifyToken() ->', typeof result, result);
                if (result.success) {
                    setMessage('LoginForm: token verified');
                } else {
                    setMessage('LoginForm: token verification failed');
                }
            });
    };

    return (
        <div>
            {message && <Message>{message}</Message>}
            <Form
                onSubmit={HandleSubmit}
            >
                <p>Use admin credentials from compose file</p>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>
                <br />
                <Button type="submit">Login</Button>
            </Form>
            <br />
            <br />
            <br />
            <Button
                onClick={HandleVerify}
            >
                Verify
            </Button>
        </div>
    );
};

export default LoginForm;
