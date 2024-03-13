import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", description: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const { title, description } = form;

    const editPost = async () => {
        try {
            await axios.put(`http://localhost:8000/posts/${id}`, form, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            console.error("Error updating data:", error);
        }
        navigate("/");
    };

    return (
        <div className="m-10">
            <input
                type="text"
                className="border outline-none p-2"
                placeholder="title"
                name="title"
                onChange={handleChange}
                value={title}
            />{" "}
            <br />
            <br />
            <input
                type="text"
                className="border outline-none p-2"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={description}
            />
            <br />
            <br />
            <div>
                <button
                    className="border rounded-md bg-gray-600 text-white p-2"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </button>
                <button
                    className="border rounded-md bg-green-700 text-white p-2"
                    onClick={editPost}
                >
                    Edit Post
                </button>
            </div>
        </div>
    );
};

export default EditPost;
