import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";

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
        <div>
            <span className="flex items-center mb-5 gap-2 border-b pb-3">
                <IoMdArrowBack
                    className="cursor-pointer"
                    size={23}
                    onClick={() => navigate("/")}
                />
                <p className="text-xl">Post Detail</p>
            </span>
            <div className="border  rounded-lg px-8 py-10">
                {post.map((item) => {
                    return (
                        <div key={item.id}>
                            <span>
                                <span className="flex items-center gap-2 text-blue-600 pb-1">
                                    <TbListDetails size={21} />
                                    <p className="text-[18px]">Title</p>
                                </span>
                                <p>{item.title}</p> <br />
                            </span>
                            <span>
                                <span className="flex items-center gap-2 text-blue-600 pb-1">
                                    <BiCommentDetail size={20} />
                                    <p className="text-[18px]">Description</p>
                                </span>
                                <p>{item.description}</p>
                            </span>
                            <Link
                                to={`/edit/${item.id}`}
                                className="inline-flex flex-row items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md mt-10"
                            >
                                <FaRegEdit size={16} />
                                <p>Edit</p>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PostDetail;
