import Input from "@/Components/Input";
import Label from "@/Components/Label";
import App from "@/Layouts/App";
import { useForm } from "@inertiajs/inertia-react";

import { Link } from "@inertiajs/inertia-react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import  ClassicEditor  from "@ckeditor/ckeditor5-build-classic";
import React, { useState } from "react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        body: "",
        date_post: "",
    });
    function sendNewPost(e) {
        e.preventDefault();
        post(route("post.store"));
    }

    function handleChange(e,editor) {
        const data = editor.getData();
        console.log(data);
        setData('body', data);
    }


    return (
        <div className="bg-white h-full rounded-lg shadow-lg px-6 py-4">
            <div className="flex justify-between mb-10 border-b border-bg_abu_tua-200">
                <p className="text-2xl font-bold text-bg_biru_tua">
                    Create NEW POST
                </p>

                <div>
                    <Link className="flex" href={route("post.page")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-bg_biru_tua"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                            />
                        </svg>
                        BACK TO POST
                    </Link>
                </div>
            </div>
            <div>
                <form onSubmit={sendNewPost}>
                    <div className="mb-3">
                        <Label value="Title POST" className=" text-gray-400" />
                        <Input
                            value={data.title}
                            handleChange={(e) =>
                                setData("title", e.target.value)
                            }
                            className="w-full"
                            name="title"
                            placeHolder="Input title post...."
                        />
                        <div>
                            {errors.title && (
                                <p className="text-red-600  ml-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <Label value="Tanggal" className=" text-gray-400" />
                        <Input
                            value={data.date_post}
                            handleChange={(e) =>
                                setData("date_post", e.target.value)
                            }
                            type="date"
                            className="w-full"
                            name="title"
                            placeHolder="Input title post...."
                        />
                        {errors.title && (
                            <p className="text-red-600  ml-1">{errors.title}</p>
                        )}
                    </div>
                    {/* <div className="mb-3">
                        <Label
                            value="Deskripsi POST"
                            className=" text-gray-400"
                        />
                        <textarea
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                            className={`border-gray-300 w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm `}
                            name="body"
                            id="body"
                            rows="5"
                        ></textarea>
                        {errors.title && (
                            <p className="text-red-600 -mt-2 ml-1">
                                {errors.title}
                            </p>
                        )}
                    </div> */}
                    <div className="mb-3">
                        <Label
                            value="Deskripsi POST"
                            className=" text-gray-400"
                        />
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={handleChange}
                        />

                        {errors.body && (
                            <p className="text-red-600 mt-2 ml-1">
                                {errors.body}
                            </p>
                        )}
                    </div>
                    <button className="bg-bg_abu_tua-200 hover:bg-bg_abu_tua-100 text-white focus:outline-none rounded-lg block px-4 py-2 w-full">
                        Save New POST
                    </button>
                </form>
            </div>
        </div>
    );
}

Create.layout = (page) => <App children={page} title="Create POST" />;
