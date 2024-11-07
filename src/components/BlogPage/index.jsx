import { useEffect, useState } from "react";
import api from "../../../utils/axios";
import Loader from "../Loader";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);

  const GetPost = async () => {
    try {
      const token = localStorage.getItem("token");
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
    setTimeout(() => {
      GetPost().finally(() => setLoading(false));
    }, 1000);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col mt-20">
      {loading && <Loader />}
      {blog.map((post) => (
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
              <h3>{post.content}</h3>
            </li>
          ))}
    </div>
  );
};

export default BlogPage;
