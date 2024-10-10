import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthContext } from "./AuthContext";


const Login = () => {

    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const [userIsValid, setUserIsValid] = useState(true);
    const nav = useNavigate();
    const {setUser} = useAuthContext();

    const onTextChange = e => {
        const copy = { ...loginCredentials };
        copy[e.target.name] = e.target.value;
        setLoginCredentials(copy);
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', loginCredentials);
        const isValid = !!data;
        if (isValid) {
            setUser(data);
            nav('/myBookmarks');
        }
        setUserIsValid(isValid);
    }

    return (<>
        <div className="row" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow" >
                <h4>Log in to your account</h4>
                {!userIsValid && <span className="text-danger">Invalid username or password. Try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input className="form-control" type='text' placeholder="Email" name='email' value={loginCredentials.email} onChange={onTextChange}></input>
                    <br />
                    <input className="form-control" type="password" placeholder="Password" name='password' value={loginCredentials.password} onChange={onTextChange}></input>
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <Link to='/signup'>Sign up for a new account</Link>
            </div>
        </div>
    </>)
}

export default Login;