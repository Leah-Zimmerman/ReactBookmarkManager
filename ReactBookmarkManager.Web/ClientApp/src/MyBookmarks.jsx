import React from "react";
import { useAuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const MyBookmarks = () => {
    const { user } = useAuthContext();
    const [bookmarks, setBookmarks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editInfo,setEditInfo]=useState({});

    const getBookmarks = async () => {
        console.log(user.id);
        const { data } = await axios.post('/api/bookmark/getBookmarksById', { id: user.id })
        setBookmarks(data);
    }
    useEffect(() => {
        getBookmarks();
    }, [])

    const onEditClick = (bookmark)=>{
        setEditMode(true);
        setEditInfo({id:bookmark.id,title:bookmark.title});
    }

    const onEditChange = (e)=>{
        const currentEditInfo = {...editInfo};
        currentEditInfo.title=e.target.value;
        setEditInfo(currentEditInfo);
    }


    const onUpdateClick = async () => {
        setEditInfo({});
        setEditMode(false);
        await axios.post('/api/bookmark/updateBookmark', { BookmarkId: editInfo.id, Title: editInfo.title });
        getBookmarks();
    }

    const deleteBookmark=async(id)=>{
        await axios.post('/api/bookmark/deleteBookmark',{Id:id});
        getBookmarks();
    }

    return (<>
        <h1>Welcome back {user.firstName} {user.lastName}</h1>
        <Link to="/addbookmark" className="btn btn-primary">Add Bookmark</Link>
        <Table className="table table-hover table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Url</th>
                    <th>Edit / Delete</th>
                </tr>
            </thead>
            <tbody>
                {bookmarks.map(b => (
                    <tr key={b.id}>
                        <td>
                            {editInfo.id!==b.id ? b.title : 
                            <input type='text' className="form-control" value={editInfo.title} onChange={(e)=>onEditChange(e,b.id)}></input>}
                        </td>
                        <td>
                            <a href={b.url} target="_blank" rel="noopener noreferrer">{b.url}</a>
                        </td>
                        <td>
                            {!editMode&&<button className="btn btn-success me-2" onClick={()=>onEditClick(b)}>Edit Title</button>}
                            {!!editMode&&<button className="btn btn-warning" onClick={onUpdateClick}>Update</button>}
                            {!!editMode&&<button className="btn btn-info me-2" onClick={()=>{setEditMode(false); setEditInfo({});}}>Cancel</button>}
                            <button className="btn btn-danger" onClick={()=>deleteBookmark(b.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>)
}
export default MyBookmarks;