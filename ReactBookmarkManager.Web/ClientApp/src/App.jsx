import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import { AuthContextComponent } from './AuthContext';
import AddBookmark from './AddBookmark';


const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/addbookmark' element={<AddBookmark />} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    )
}


export default App;