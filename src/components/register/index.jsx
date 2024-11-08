import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios.js";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function Register() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const PostData = async (data) => {
    try {
      const res = await api.post("/register", data);
      const token = res.data.token

      if(token){
        localStorage.setItem("token" , token)
      }
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  function handleRegister(e) {
    e.preventDefault();
    const data = {
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      role: "user"
    };

    PostData(data);
  }

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Regestratsiya
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Akkaunt yaratish uchun malumotlarni kiriting
        </Typography>
        <form
          className="mx-auto max-w-[24rem] text-left"
          onSubmit={handleRegister}
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="username">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Username
              </Typography>
            </label>
            <Input
              id="username"
              color="gray"
              size="lg"
              name="username"
              placeholder="username"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Parol
              </Typography>
            </label>
            <Input
              id="password"
              size="lg"
              name="password"
              placeholder="********"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button color="outline" size="lg" className="mt-6" fullWidth type="submit">
            Jonatish
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
            onClick={() => navigate("/login")}
          >
            Akkauntga kirish
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Register;
