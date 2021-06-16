import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap';

const LoginForm = () => {
    const [form, setForm] = useState({
        username:'',
        password:''
    });

    const { push } = useHistory();

    const handleChange = (event) => {
        event.stopPropagation();
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const handleSublmit = (event) => {
        event.preventDefault();
        console.log("Submiting:", form.username, form.password)
        setForm({
            username:'',
            password:''
        });
        push('/gameboard');
    }

    return (
        <form className="login-form" onSubmit={handleSublmit}>
            <label htmlFor="username">username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} />
            <label htmlFor="password">password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            <Button color="primary">submit</Button>
        </form>
    )
}
export default LoginForm;