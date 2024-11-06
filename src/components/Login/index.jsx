import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios.js";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = async () => {
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;

      localStorage.setItem("token", token);

      navigate("/");

    } catch (error) {
      console.log(error.message);
    }
  };

  function handleLogin(e) {
    e.preventDefault();
    setEmail(e.target[0].value);
    setPassword(e.target[1].value);

    PostData();
  }

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Akkauntga kirish
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Akkauntga kirish uchun malumotlarni kiriting
        </Typography>
        <form className="mx-auto max-w-[24rem] text-left" onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
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
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Parol
              </Typography>
            </label>
            <Input
              size="lg"
              name="password"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
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
          <Button color="gray" size="lg" className="mt-6" fullWidth type="submit">
            Malumotlarni kiriting
          </Button>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="/forgor"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Parol esimda emas
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
            onClick={() => navigate("/register")}
          >
            Regestratsiya
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
