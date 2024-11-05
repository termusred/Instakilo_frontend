import { Typography, Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import api from "../../../utils/axios";

function Blog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [media, setMedia] = useState(null); // Change to null for better handling

    const PostToDb = async () => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (media) {
                for (let i = 0; i < media.length; i++) {
                    formData.append("images", media[i]); // Append files
                }
            }

            const response = await api.post("/posts", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Set content type to multipart
                },
            });
            console.log(response);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    function postThisShit(e) {
        e.preventDefault();
        setTitle(e.target[0].value);
        setContent(e.target[1].value);
        if (e.target[2].files.length) {
            setMedia(e.target[2].files); // Use `files` instead of `value`
        }
        PostToDb();
    }

    return (
        <div className="w-screen h-screen mt-16 flex justify-center">
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
                    multiple // Allow multiple file selection
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
