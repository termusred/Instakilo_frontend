import { Typography, Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios";
import { toast  , ToastContainer} from "react-toastify";

function Blog() {
    const [media, setMedia] = useState([]);    

    const navigate = useNavigate()

    const PostToDb = async (title , content) => {
    
        try {
            const token = localStorage.getItem("token");
            if(!token){
                console.log("JWT token not found");
                return;
              }
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
    
            if (media.length > 0) {
                for (let i = 0; i < media.length; i++) {
                    formData.append("images", media[i]);
                }
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
        if (e.target[2].files.length > 0) {
            setMedia(Array.from(e.target[2].files));
        }
        PostToDb(e.target[0].value , e.target[1].value);
    }
    
    
    return (
        <div className="w-screen h-screen mt-16 flex justify-center">
            <ToastContainer/>
            <form className="w-72 flex flex-col gap-5 h-full overflow-y-auto" onSubmit={(e) => postThisShit(e)}>
                <label htmlFor="title">Title</label>
                <Input
                    id="title"
                    color="gray"
                    size="lg"
                    type="text"
                    placeholder="title for your blog"
                    required
                    minLength={3}
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <div className="ContentCon h-36">
                    <label htmlFor="content">Content</label>
                    <Input
                        id="content"
                        color="gray"
                        required
                        minLength={3}
                        type="text"
                        size="lg"
                        placeholder="Content of your blog"
                        className="w-full h-32 placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <label htmlFor="media">Any pictures?</label>
                <Input
                    id="media"
                    color="gray"
                    size="lg"
                    type="file"
                    placeholder="media of your blog"
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    multiple
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <button type="submit" className="bg-blue-gray-100 rounded pt-1">Publish</button>
            </form>
        </div>
    );
}

export default Blog;
