import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const AddBookmark = ()=>{
    const {user} = useAuthContext();
    const [bookmark,setBookmark] = useState({title:'',url:'',userId:user.id})
    const nav = useNavigate();

    const onTextChange =e=>{
        const copy = {...bookmark};
        copy[e.target.name] = e.target.value;
        setBookmark(copy);
    }

    const onFormSubmit = async(e)=>{
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark',bookmark);
        nav('/');
    }
    
    return(<>
        <div className="row" style={{minHeight:'60vh', display:'flex', alignItems:'center'}}>
            <div className="col-md-6 offset md-3 bg-light p-4 rounded shadow">
                <form onSubmit={onFormSubmit}>
                    <h1>Add Bookmark</h1>
                    <input type="text" className="form-control" name="title" placeholder="Title" value={bookmark.title} onChange={onTextChange}></input>
                    <br/>
                    <input type="text" className="form-control" name="url" placeholder="URL" value={bookmark.url} onChange={onTextChange}></input>
                    <br/>
                    <button className="btn btn-primary">Add</button>
                </form>
            </div>
        </div>
    </>)
}
export default AddBookmark;