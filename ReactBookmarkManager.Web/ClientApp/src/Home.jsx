import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [bookmarkCounts, setBookmarkCounts] = useState([]);

    useEffect(() => {
        const getBookmarkCounts = async () => {
            const { data } = await axios.get('/api/bookmark/getTop5BookmarksWithUserCount');
            setBookmarkCounts(data);
        }
        getBookmarkCounts();
    })

    return (
        <>
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links</h3>
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '75%' }}>Url</th>
                        <th style={{ width: '25%' }}>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarkCounts.map((b, i) => (
                        <tr key={i}>
                            <td>
                                <a href={b.url} target="_blank" rel="noopener noreferrer">{b.url}</a>
                            </td>
                            <td>{b.userCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Home;