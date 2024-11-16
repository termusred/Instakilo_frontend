import { Typography, Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios";
import { toast  , ToastContainer} from "react-toastify";

function Blog() {
    const navigate = useNavigate()

    const PostToDb = async (title , content , media) => {
    
        try {
            const token = localStorage.getItem("token");
            if(!token){
                console.log("JWT token not found");
                return;
              }
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
    
            for (let i = 0; i < media.length; i++) {
                formData.append("images", media[i]);
            }
    
            const response = await api.post("/posts", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response) {
                navigate("/");
            }
        } catch (error) {
            toast.error("Buddy i think you are brain dead , maybe it is problem in me:(")
            console.error("Error fetching posts:", error);
        }
    };
    
    
    function postThisShit(e) {
        e.preventDefault();
        PostToDb(e.target[0].value , value ,e.target[10].files);
    }
    
    const [value, setValue] = useState(
        '<h1></h1><br /><p></p>'
    );
    
    return (
        <div className="w-screen h-screen mt-16 flex justify-center">
            <ToastContainer/>
            <form className="flex flex-col gap-5 h-auto w-1/2" onSubmit={(e) => postThisShit(e)}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    placeholder="Title of your blog"
                    className="form-input p-1"
                    required
                    name="title"
                />
                <div className="ContentCon">
                    <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        className="border border-blue-gray-200 rounded"
                    />
                </div>
                <Input
                    id="media"
                    color="gray"
                    size="lg"
                    type="file"
                    placeholder="Media of your blog"
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    multiple
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <button type="submit" className="bg-blue-gray-100 rounded pt-1">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Blog;
