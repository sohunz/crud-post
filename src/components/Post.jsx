import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Post = () => {
    const [posts, setPosts] = useState([]);
    const topPosts = posts.reverse();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get("http://localhost:8000/posts");
                const data = response.data;
                setPosts(data);
                console.log(data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchPost();
    }, []);

    // delete post
    const deletePost = (postId) => {
        axios.delete(`http://localhost:8000/posts/${postId}`);
        setPosts(posts.filter((post) => post.id !== postId));
    };

    return (
        <div className="max-w-[700px] mx-auto pt-10">
            <Link
                to="/create"
                className="bg-green-700 text-white p-2 rounded-md"
            >
                Create Post
            </Link>
            <div className="mt-10">
                <div className=" grid grid-cols-2 gap-3">
                    {topPosts.map((post) => {
                        return (
                            <div
                                key={post.id}
                                className="border p-4 flex flex-row justify-between rounded-lg"
                            >
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <p className="text-xl mb-3 line-clamp-2">
                                            {post.title}
                                        </p>
                                        <p className="text-gray-500 line-clamp-3">
                                            {post.description}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/post/${post.id}`}
                                        className="border "
                                    >
                                        see detail
                                    </Link>
                                </div>
                                <div className="flex gap-5">
                                    <Link to={`/edit/${post.id}`}>
                                        <FaRegEdit />
                                    </Link>
                                    <span
                                        onClick={() => deletePost(post.id)}
                                        className=" cursor-pointer"
                                    >
                                        <IoCloseSharp />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Post;
