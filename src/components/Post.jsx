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
    const deletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:8000/posts/${postId}`);
            setPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postId)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <Link
                to="/create"
                className="bg-blue-700 text-white px-3 py-3 rounded-md"
            >
                Create Post
            </Link>
            <div className="mt-10 border-t pt-5">
                {/* <div className=" grid grid-cols-2 gap-3">
                    {topPosts.map((post) => {
                        return (
                            <div
                                key={post.id}
                                className="border p-5 flex flex-row justify-between rounded-lg group"
                            >
                                <div className="flex flex-col justify-between">
                                    <div className="mb-6">
                                        <p className="text-xl mb-3 line-clamp-2">
                                            {post.title}
                                        </p>
                                        <p className="text-gray-500 line-clamp-3">
                                            {post.description}
                                        </p>
                                    </div>
                                    <Link to={`/post/${post.id}`}>
                                        <p className="text-sm text-blue-600 invisible group-hover:visible hover:underline">
                                            See detail
                                        </p>
                                    </Link>
                                </div>
                                <div className="flex gap-5 pl-5">
                                    <Link to={`/edit/${post.id}`}>
                                        <FaRegEdit size={16} />
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
                </div> */}
                {topPosts.length > 0 ? (
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3">
                        {topPosts.map((post) => (
                            <div
                                key={post.id}
                                className="border p-5 flex flex-row justify-between rounded-lg group"
                            >
                                <div className="flex flex-col justify-between">
                                    <div className="mb-6">
                                        <p className="text-xl mb-3 line-clamp-2">
                                            {post.title}
                                        </p>
                                        <p className="text-gray-500 line-clamp-3">
                                            {post.description}
                                        </p>
                                    </div>
                                    <Link to={`/post/${post.id}`}>
                                        <p className="text-sm text-blue-600 invisible group-hover:visible hover:underline">
                                            See detail
                                        </p>
                                    </Link>
                                </div>
                                <div className="flex gap-5 pl-5">
                                    <Link to={`/edit/${post.id}`}>
                                        <FaRegEdit size={16} />
                                    </Link>
                                    <span
                                        onClick={() => deletePost(post.id)}
                                        className="cursor-pointer"
                                    >
                                        <IoCloseSharp />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 pl-[1px]">
                        No posts to display.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Post;
