import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import {GrLike} from "react-icons/gr"
import { LiaReplySolid } from "react-icons/lia";
import Loader from "../Loader";
import { useNavigate, useParams } from "react-router-dom";

const BlogPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);

  const navigate = useNavigate()

  const GetPost = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        console.error("JWT token not found");
        return;
      }
      const response = await api.get(`/post/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlog([response.data]);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    GetPost().finally(() => setLoading(false));
  }, []);

  const LeaveComment = async (event, postId) => {
    event.preventDefault();
    const comment = event.target[0].value;
    try {
      const token = localStorage.getItem("token");
      if(!token){
        console.error("JWT token not found");
        return;
      }
      const response = await api.post(`/posts/${postId}/comments`, { content: comment , user : token}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response){
        event.target[0].value = ""
        GetPost()
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <div className="w-screen flex flex-col mt-20">
      {loading && <Loader />}
      {blog.map((post) => (
        <div className="flex flex-col overflow-scroll items-center gap-4">
        
              <div className="w-full h-96 mb-4 overflow-scroll rounded-lg">
                {post.media[0] ? (
                  <img
                  src={`instakilodatabase-production.up.railway.app/images/${post.media[0]}`}
                  alt={post.title}
                  className="object-contain w-full h-full"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
                {post.author.map((el)=>{
                  return (
                    <div className="">
                      <h3>Author : {el.username}</h3>
                      <h3>Author's email : {el.email}</h3>
                    </div>
                  )
                  })}
              <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
              <div dangerouslySetInnerHTML={{__html : post.content}} className="w-1/2"/>
              <div className="flex flex-col gap-4 flex-wrap items-center">
                {post.comments.map((el)=>{
                    return (
                        <div key={el._id} className="p-2 bg-blue-gray-100 flex justify-between min-h-16 max-w-[90%] min-w-[90%]">
                            <ul className="mt-4 space-y-3">
                            </ul>
                            <h3>{el.content}</h3>
                            <div className="flex gap-2 items-center bg-blue-gray-200 p-2">
                                Likes:
                                <h4>{el.likes}</h4>
                                <button><GrLike/></button>
                                Replys : 
                                <h4>{el.replysCount}</h4>
                                <button><LiaReplySolid/></button>
                                {el.user?.map((user) => (
                                  <div key={user._id} className="flex flex-col">
                                    <span>commented by : {user.username}</span>
                                    <button onClick={() => navigate("/users/" + user._id)}>Check user profile</button>
                                  </div>
                                ))}

                            </div>
                        </div>
                    )
                  })}
              </div>
              <form onSubmit={(event) => LeaveComment(event, post._id)} className="mt-8">
                  <input type="text" placeholder="Comment on this blog" required name="text"/>
                  <button type="submit" className="bg-blue-gray-100 p-2 rounded">
                      Comment
                  </button>
              </form>
          </div>
          ))}
    </div>
  );
};

export default BlogPage;
