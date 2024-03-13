import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", description: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const { title, description } = form;

    const create = async () => {
        try {
            if (form.title || form.description !== "") {
                axios.post("http://localhost:8000/posts", form);
                navigate("/");
            } else {
                alert("please input...");
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="m-10">
            <span onClick={() => navigate("/")}>
                <IoMdArrowBack className="mb-5 cursor-pointer" />
            </span>
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
            <button
                className="border rounded-md bg-green-700 text-white p-2"
                onClick={create}
            >
                Create
            </button>
        </div>
    );
};

export default CreatePost;
