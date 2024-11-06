import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import Loader from "../Loader/index.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const LeaveComment = async (event, post) => {
    event.preventDefault();
    const comment = event.target[0].value;
    try {
      const token = localStorage.getItem("token");
      await api.post(`/posts/${post}/comments`, { content: comment }, {
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
                    onError={() => console.error("Image failed to load:", post.media)} // Log on error
                  />
                ) : (
                  <p>No image available</p> // Fallback if no media
                )}
              </div>
              <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
              <h3>{post.content}</h3>
              <h3 className="text-lg font-medium">Comments</h3>
              <ul className="mt-4 space-y-3">
                {post.comments?.map((comment, index) => (
                  <li
                    key={index}
                    className="border border-gray-300 p-3 rounded-lg"
                  >
                    {comment.content}
                  </li>
                ))}
                <form onSubmit={(event) => LeaveComment(event, post._id)}>
                  <input type="text" placeholder="Comment on this blog" required />
                  <button type="submit" className="bg-blue-gray-100 p-2 rounded">Comment</button>
                </form>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Posts;
