import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const PostDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [posts, setPost] = useState([]);
    const post = posts.filter((item) => item.id === id);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get("http://localhost:8000/posts");
            const data = response.data;
            setPost(data);
        };
        fetchPosts();
        console.log(posts);
    }, []);
    return (
        <div className="m-10">
            <span onClick={() => navigate("/")}>
                <IoMdArrowBack className="mb-5 cursor-pointer" />
            </span>
            <div>
                <h2 className="mb-4 font-bold text-xl">Post Detail</h2>
                {post.map((item) => {
                    return (
                        <div key={item.id}>
                            <p>Title: {item.title}</p> <br />
                            <p>Description: {item.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PostDetail;
