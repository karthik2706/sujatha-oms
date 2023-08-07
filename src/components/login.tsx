import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import neo4j from "neo4j-driver";
import { Driver, Session } from 'neo4j-driver';
import { neo4jApis } from "../neo4jApis";
import { useCookies } from 'react-cookie';

interface LoginProps {
    neo4jApis: any;
}


const loginData = { email: '', password: '' };

export const Register = () => {
    const [formData, setFormData] = useState(loginData);

    const handleInputChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        neo4jApis.registerUser(formData.email, formData.password).then(result => {
            console.log(result);
            // Clear form data
            setFormData({ email: '', password: '' });
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <form className='form-control' onSubmit={handleSubmit}>
            <br />
            <input type="email" className='form-control' name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
            <br />
            <input type="password" className='form-control' name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
            <br />
            <button className='btn btn-primary' type="submit">Register</button>
            <br /><br />
        </form>
    );
};

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['userLoginSuccess']);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        neo4jApis
            .checkUserLogin(email, password)
            .then((result: any) => {
                console.log(result);
                if (result) {
                    // User is valid, do something
                    setCookie('userLoginSuccess', email, { path: '/' });
                    navigate('/');
                } else {
                    // User is invalid, show error
                    alert('Login Failed');
                    console.log('Login Failed');
                }
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    return (
        <>
            <br />
            <h1>Login</h1>
            <hr />
            <form className='form-control' onSubmit={handleSubmit}>
                <br />
                <p>Email</p>
                <input
                    className='form-control'
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
                <p>Password</p>
                <input
                    className='form-control'
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <button type="submit" className='btn btn-primary'>Login</button>
                <br />
                <br />
            </form>
        </>
    );
};

