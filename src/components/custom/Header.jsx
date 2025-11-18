import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <>
      <div className="px-4 md:px-16 py-4 h-24  fixed top-0 w-full bg-white/80 backdrop-blure-md z-50 border-b bg-slate-50 shadow-sm flex justify-between items-center gap-4 ">
        <a href="/">
          <img
            src="/logi.png"
            className="mt-2 w-52 h-36 mb-2 object-contain "
          />
        </a>

        <div className="hidden gap-4 sm:flex">
          <a href="/create-trip">
            <Button className="rounded-3xl bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <IoMdAdd /> Create Trips
            </Button>
          </a>

          <div>
            {user ? (
              <div className="flex gap-4 items-center">
                <a href="/my-trips">
                  <Button className="rounded-3xl bg-green-500 hover:bg-greeen-600 text-white flex items-center gap-2">
                    <IoMdAdd /> Explore Trips
                  </Button>
                </a>

                <Popover>
                  <PopoverTrigger>
                    <img
                      src={user?.picture}
                      className="h-[35px] w-[35px]  rounded-full"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="bg-black text-white shadow-md rounded-lg p-2 w-auto">
                    <h2
                      className="cursor-pointer "
                      onClick={() => {
                        googleLogout();
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </h2>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Button
                onClick={() => setOpenDialog(true)}
                className="rounded-full"
              >
                Sign In
              </Button>
            )}
          </div>

          <Dialog open={openDialog}>
            <DialogContent ref={modalRef} className="sm:max-w-md">
              <DialogDescription>
                <div className="flex-col font-semibold items-center h-24 text-2xl text-center text-gray-800">
                  Get Start with Travel Buddy
                  <div className="flex justify-center items-center">
                  <img
                    src="/logi.png"
                    className="w-52 h-20  object-contain "
                  />
                  </div>
                </div>
              </DialogDescription>

              <div className="flex gap-4 justify-center mt-5">
                <Button
                  onClick={login}
                  className="justify-center gap-4 w-full item-center"
                >
                  <FcGoogle className="w-7 h-7 " />
                  Sign in with Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2 sm:hidden ">
          <div>
            {user ? (
              <div className="flex gap-2 items-center">
                <a href="/my-trips">
                  <Button
                    variant="outline"
                    classname="rounded-full onhover:bg-gray-800"
                  >
                    My Trips
                  </Button>
                </a>

                <Popover>
                  <PopoverTrigger>
                    <img
                      src={user?.picture}
                      className="h-[35px] w-[35px]  rounded-full"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="bg-white text-black  shadow-md rounded-lg p-2 w-auto">
                    <h2
                      className="cursor-pointer border-lg "
                      onClick={() => {
                        googleLogout();
                        localStorage.removeItem("user");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </h2>
                    <a href="/create-trip">
                      <h2 className=" gap-2 mt-4">Create Trips</h2>
                    </a>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Button
                onClick={() => setOpenDialog(true)}
                className="rounded-full"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
