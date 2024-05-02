import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

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
            if (form.title !== "") {
                await axios.put(`http://localhost:8000/posts/${id}`, form, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                Swal.fire({
                    title: "Updated!",
                    text: "Your post has been edited.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                });
                navigate("/");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div>
            <span className="flex items-center mb-5 gap-2 border-b pb-3">
                <IoMdArrowBack
                    className="cursor-pointer"
                    size={23}
                    onClick={() => navigate("/")}
                />
                <p className="text-xl">Edit Post</p>
            </span>
            <input
                type="text"
                className="border outline-none pl-3 p-2 lg:w-[50%] md:w-[50%] sm:w-full w-full mt-5 rounded-md"
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
            <div>
                <button
                    className="border rounded-md bg-green-700 text-white px-3 py-2"
                    onClick={editPost}
                >
                    Edit Post
                </button>
            </div>
        </div>
    );
};

export default EditPost;
