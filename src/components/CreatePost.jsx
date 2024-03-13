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
            if (title !== "" && description !== "") {
                await axios.post("http://localhost:8000/posts", form);
                navigate("/");
            } else if (title == "" && description !== "") {
                alert("please input title");
            } else if (title !== "" && description == "") {
                alert("Please input description.");
            } else if (title == "" && description == "") {
                alert("please input title and descripton");
            }
            console.log("form", form);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <span className="flex items-center mb-10 gap-2 border-b pb-3">
                <IoMdArrowBack
                    className="cursor-pointer"
                    size={23}
                    onClick={() => navigate("/")}
                />
                <p className="text-xl">Create Post</p>
            </span>
            <input
                type="text"
                className="border outline-none pl-3 p-2 lg:w-[50%] md:w-[50%] sm:w-full w-full rounded-md"
                placeholder="title"
                name="title"
                onChange={handleChange}
                value={title}
            />{" "}
            <br />
            <br />
            <input
                type="text"
                className="border outline-none pl-3 p-2 lg:w-[50%] md:w-[50%] sm:w-full w-full rounded-md"
                placeholder="description"
                name="description"
                onChange={handleChange}
                value={description}
            />
            <br />
            <br />
            <button
                className="border rounded-md bg-green-700 text-white py-2 px-4"
                onClick={create}
            >
                Create
            </button>
        </div>
    );
};

export default CreatePost;
