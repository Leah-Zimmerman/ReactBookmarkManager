import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const nav = useNavigate();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post('/api/account/signup',formData);
        nav('/login');
    }

    return (
        <>
            <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                    <h4>Sign up for a new account</h4>
                    <form onSubmit={handleSubmit}> 
                        <input className="form-control" type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={onTextChange}></input>
                        <br />
                        <input className="form-control" type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={onTextChange}></input>
                        <br />
                        <input className="form-control" type="text" name="email" placeholder="Email" value={formData.email} onChange={onTextChange}></input>
                        <br />
                        <input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={onTextChange}></input>
                        <br />
                        <button className="btn btn-primary">Signup</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Signup;