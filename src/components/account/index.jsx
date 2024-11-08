import { useState, useEffect } from "react";
import { Avatar, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import api from "../../../utils/axios";
import {useNavigate , useParams} from "react-router-dom"
import Loader from "../Loader";


import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Account() {
  const [activeTab, setActiveTab] = useState("home");
  const [account , setAccount] = useState([])
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const {userId} = useParams()
  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        console.error("JWT token not found");
        return;
      }
      const response = await api.get("/posts/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  const GetUser = async () => {
    try {
      const response = await api.get(`/users/${userId}` , {
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      setAccount([response.data.data])
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchPosts()
      GetUser().finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-screen flex flex-col mt-32">
      <div className="Profil_Upperpart mt-5 w-full h-1/2 flex items-center ml-52">
        <div className="avatarWrap w-56 flex justify-center">
          <Avatar
            src="https://sneakcenter.com/cdn/shop/products/air-jordan-1-retro-high-dark-mocha-sneakcenter-1-34785037123851.png?v=1701593975&width=1024"
            className="h-36 w-36"
          />
        </div>
        {account.map((el)=>{
          return (
            <div className="Text_part flex gap-7 flex-col">
                <div className="actions flex gap-7 items-center">
                  <h2 className="username">{el.username}</h2>
                  <button className="subscribe bg-blue-600 p-2 rounded">change</button>
                  <button className="dop bg-red-600 p-2 rounded text-white" onClick={(e)=> {
                    e.stopPropagation()
                    if(window.confirm("Do you want to log out?")){
                      localStorage.removeItem("token")
                      navigate("/register")
                    }
                  }}>Log out</button>
                </div>
              <div className="counters flex gap-8">
                <h3 className="blogsCount">212 blogs</h3>
                <h3 className="subs">12 followers</h3>
                <h3 className="subbedTo">12,031 followed</h3>
              </div>
              <div className="description">
                {el.description && <h3 className="description max-w-36">{el.description}</h3>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="Profil_BottomPart flex-grow w-full overflow-y-auto mt-20">
        <Tabs value={activeTab} onChange={setActiveTab} className="w-full">
          <TabsHeader>
            <Tab value="home">Blogs</Tab>
            <Tab value="profile">Comments</Tab>
            <Tab value="longer-tab">Info for admin</Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel value="home">
              <div className="p-4 flex overflow-auto gap-4 flex-wrap w-full">
                {posts.length ? (
                  posts.map((el) => (
                    <Card className="w-[24rem] max-w-[24rem] flex-wrap" key={el.id}>
                      <CardHeader floated={false} shadow={false} className="rounded-none flex-wrap">
                        <Typography color="blue-gray" className="mt-1 mb-2 text-[20px] font-bold">
                          {el.title}
                        </Typography>
                      </CardHeader>
                      <CardBody className="px-4 pt-0 flex-wrap min-h-44">
                        <Typography className="font-normal text-gray-600">
                          {el.content.length > 50 ? `${el.content.slice(0, 100)}...` : el.content}
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0 px-4">
                        <Button onClick={() => navigate("/blog/" + el.slug)}>read more</Button>
                      </CardFooter>
                    </Card>
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
