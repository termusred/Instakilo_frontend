import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import Loader from "../Loader/index.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsVisibility, setCommentsVisibility] = useState({});

  const navigate = useNavigate()

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        navigate("/register")
        return;
      }
      const response = await api.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
  useEffect(() => {
    fetchPosts().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }



  return (
    <div className="w-screen min-h-screen flex justify-center py-8">
      <ToastContainer />
      <div className="lenta w-full md:w-1/2 mt-20">
        <ul className="space-y-10">
          {posts.map((post) => (
            <li
              key={post._id}
              className="flex flex-col bg-white p-6 rounded-lg shadow-md"
              style={{ minHeight: '700px' }}
            >
              <div className="w-full h-96 mb-4 overflow-hidden rounded-lg">
                {post.media[0] ? (
                  <img
                    src={`http://localhost:3000/images/${post.media[0]}`}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
              {post.content.length > 150 ? `${post.content.slice(0, 100)}...` : post.content}
              <button onClick={() => navigate("/blog/" + post.slug)}>Read more</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
