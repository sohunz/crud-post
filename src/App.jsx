import React from "react";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import { Routes, Route } from "react-router-dom";
import PostDetail from "./components/PostDetail";

const App = () => {
    return (
        <div className=" max-w-[800px] mx-auto mt-10 p-5">
            <Routes>
                <Route path="/" element={<Post />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
        </div>
    );
};

export default App;
