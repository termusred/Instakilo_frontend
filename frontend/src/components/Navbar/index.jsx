import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Section() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const navigate = useNavigate()


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);
  return (
    <>
      <Navbar shadow={false} fullWidth className="border-0 fixed z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link color="blue-gray" className="text-lg font-bold cursor-default text-black" to={"/"}>
            Instakilo
          </Link>
          <ul className="ml-10 hidden items-center gap-6 lg:flex">
            <Link to="/" className="text-black flex">
              <RectangleStackIcon className="h-5 w-5"/>
              Posts
            </Link>
            <Link to="/account" className="text-black flex">
              <UserCircleIcon className="h-5 w-5"/>
              Account
            </Link>
            <Link to="/stats" className="text-black flex">
              <CommandLineIcon className="h-5 w-5"/>
              Stats
            </Link>
          </ul>
          <div className="hidden items-center gap-4 lg:flex">
            {!localStorage.getItem('token') && <Button variant="text" onClick={() => navigate("/login")}>Akkauntga kirish</Button>}
            {!localStorage.getItem('token')
             && <Button color="gray" onClick={()=> navigate("/register")}>Regestratsiya</Button>}
          </div>
          <IconButton
            variant="text"
            color="gray"
            onClick={handleOpen}
            className="ml-auto inline-block lg:hidden"
          >
            {open ? (
              <XMarkIcon strokeWidth={2} className="h-6 w-6" />
            ) : (
              <Bars3Icon strokeWidth={2} className="h-6 w-6" />
            )}
          </IconButton>
        </div>
        <Collapse open={open}>
          <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
            <ul className="flex flex-col gap-4">
            <Link to="/" className="text-black flex">
              <RectangleStackIcon className="h-5 w-5"/>
              Posts
            </Link>
            <Link to="/account" className="text-black flex">
              <UserCircleIcon className="h-5 w-5"/>
              Account
            </Link>
            <Link to="/stats" className="text-black flex">
              <CommandLineIcon className="h-5 w-5"/>
              Stats
            </Link>
            </ul>
            <div className="mt-6 mb-4 flex items-center gap-4">
              <Button variant="text" onClick={() => navigate("/login")}>Akkauntga kirish</Button>
              <Button color="gray" onClick={()=> navigate("/register")}>Registratsiya</Button>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </>
  );
}

export default Section;