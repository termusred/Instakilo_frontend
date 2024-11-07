import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import Loader from "../Loader/index.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Comment from "../comment/index.jsx";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsVisibility, setCommentsVisibility] = useState({});

  const navigate = useNavigate()

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
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

  const toggleComments = (postId) => {
    setCommentsVisibility((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const LeaveComment = async (event, postId) => {
    event.preventDefault();
    const comment = event.target[0].value;
    try {
      const token = localStorage.getItem("token");
      await api.post(`/posts/${postId}/comments`, { content: comment }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

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
              <button onClick={() => toggleComments(post._id)}>
                {commentsVisibility[post._id] ? "Hide comments" : "Check comments"}
              </button>
              {commentsVisibility[post._id] && <Comment data={post.comments} />}
              <ul className="mt-4 space-y-3">
                <li className="border border-gray-300 p-3 rounded-lg"></li>
                <form onSubmit={(event) => LeaveComment(event, post._id)}>
                  <input type="text" placeholder="Comment on this blog" required />
                  <button type="submit" className="bg-blue-gray-100 p-2 rounded">
                    Comment
                  </button>
                </form>
                <button onClick={() => navigate("/blog/" + post.slug)}>Read more</button>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
