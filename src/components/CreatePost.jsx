import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

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
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Create has been successed!",
                    showConfirmButton: false,
                    timer: 1000,
                });
                navigate("/");
            } else if (title == "" && description !== "") {
                Swal.fire({
                    icon: "error",
                    title: "Please input Title!",
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
            } else if (title !== "" && description == "") {
                Swal.fire({
                    icon: "error",
                    title: "Please input Description",
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
            } else if (title == "" && description == "") {
                Swal.fire({
                    icon: "error",
                    title: "Please input Title and Description",
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
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
