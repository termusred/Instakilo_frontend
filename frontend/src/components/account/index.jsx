import { useState , useEffect} from "react";
import { Avatar, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import api from "../../../utils/axios";
import Loader from "../Loader";

function Account() {
  const [activeTab, setActiveTab] = useState("home");
  const [posts , setPosts] = useState([])
  const [loading , setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await api.get("/posts/user", {
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
    setTimeout(() => {
      fetchPosts().finally(() => setLoading(false))
    }, 1000);
  }, []);
  

  if(loading){
    return <Loader/>
  }

  return (
    <div className="h-screen w-screen">
      <div className="Profil_Upperpart mt-5 w-full h-1/2 flex items-center ml-52">
        <div className="avatarWrap w-56 flex justify-center">
          <Avatar src="https://sneakcenter.com/cdn/shop/products/air-jordan-1-retro-high-dark-mocha-sneakcenter-1-34785037123851.png?v=1701593975&width=1024" className="h-36 w-36" />
        </div>
        <div className="Text_part flex gap-7 flex-col">
          <div className="actions flex gap-7 items-center">
            <h2 className="username">Prashmandovki_uz</h2>
            <button className="subscribe bg-blue-600 p-2 rounded">Follow</button>
            <button className="dop bg-red-600 p-2 rounded text-white">Delete user</button>
          </div>
          <div className="counters flex gap-8">
            <h3 className="blogsCount">212 blogs</h3>
            <h3 className="subs">12 followers</h3>
            <h3 className="subbedTo">12,031 followed</h3>
          </div>
          <div className="description">
            <h3 className="job">Jobless</h3>
            <h3 className="description max-w-36">I don't care about the text written here; it is just a mindless lorem ipsum, so don't even try to find any meaning in it.</h3>
          </div>
        </div>
      </div>

      <div className="Profil_BottomPart flex mt-10 w-full">
        <Tabs value={activeTab} onChange={setActiveTab} className="w-full">
          <TabsHeader>
            <Tab value="home">Blogs</Tab>
            <Tab value="profile">Comments</Tab>
            <Tab value="longer-tab">Info for admin</Tab>
          </TabsHeader>
          <TabsBody>
          <TabPanel value="home">
            <div className="p-4 flex flex-col overflow-scroll">
              {posts.length > 0 ? (
                posts.map((el) => (
                  <li key={el._id}>
                    <h2>{el.title}</h2>
                    <p>{el.content}</p>
                  </li>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </TabPanel>
            <TabPanel value="profile">
              <div className="p-4">Tab content for Profile</div>
            </TabPanel>
            <TabPanel value="longer-tab">
              <div className="p-4">Tab content for Loooonger Tab</div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}

export default Account;
