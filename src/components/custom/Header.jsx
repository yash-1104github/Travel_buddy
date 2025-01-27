import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";



const Header = () => {

  // bg - [hsl(120, 8 %, 69 %)] bg-[#adbdad] 

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    console.log(user);
    console.log('User Data')
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log(error)
  }
  )


  const GetUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((res) => {
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }

  return (
    <>
      <div className="p-3 h-[5rem]  bg-[#c1c8bb]  shadow-sm flex justify-between items-center px-4 gap-4 ">

        <a href='/' >
          <img src="/logo.svg" />
        </a>

        <div className="hidden gap-4 sm:flex">
          <a href='/create-trip'>
            <Button className="rounded-3xl"><IoMdAdd /> Create Trips</Button>
          </a>

          <div>
            {
              user ?
                <div className="flex gap-4 items-center">
                  <a href="/my-trips">
                    <Button variant='outline' classname="rounded-full">My Trips</Button>
                  </a>

                  <Popover>
                    <PopoverTrigger>
                      <img src={user?.picture} className="h-[35px] w-[35px]  rounded-full" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-black text-white shadow-md rounded-lg p-2 w-auto">
                      <h2 className="cursor-pointer " onClick={() => {
                        googleLogout();
                        localStorage.removeItem('user');
                        window.location.reload();
                      }} >
                        Logout
                      </h2>
                    </PopoverContent>
                  </Popover>

                </div>
                : <Button onClick={() => setOpenDialog(true)} className="rounded-full">Sign In</Button>
            }

          </div>




          <Dialog open={openDialog}>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>

                <DialogDescription>
                  {/* <img src="/logo.svg"/> */}
                  <h2 className="font-bold text-lg flex text-black">Sign in with Google</h2>
                  <p className="flex"> Sign in to the App with Google authentication securly</p>
                   
                  <div className="flex gap-4 justify-between mt-5"> 
                    <Button onClick={login} className="  flex gap-4 w-full item-center">
                      <FcGoogle className='w-7 h-7 ' />
                      Sign in with Google
                    </Button>
                  <Button onClick={() => setOpenDialog(false)} > Close</Button>
                  </div> 
                 
                </DialogDescription>
          
                
                
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>

       <div className="flex gap-2 sm:hidden ">
          <div>
            {
              user ?
                <div className="flex gap-2 items-center">
                  <a href="/my-trips">
                    <Button variant='outline' classname="rounded-full">My Trips</Button>
                  </a>

                  <Popover>
                    <PopoverTrigger>
                      <img src={user?.picture} className="h-[35px] w-[35px]  rounded-full" />
                    </PopoverTrigger>
                    <PopoverContent className="bg-white text-black  shadow-md rounded-lg p-2 w-auto">
                      <h2 className="cursor-pointer border-lg " onClick={() => {
                        googleLogout();
                        localStorage.removeItem('user');
                        window.location.reload();
                      }} >
                        Logout
                      </h2>
                      <a href='/create-trip'>
                        <h2 className=" gap-2 mt-4">Create Trips</h2>
                      </a>
                    </PopoverContent>
                  </Popover>

                </div>
                : <Button onClick={() => setOpenDialog(true)} className="rounded-full">Sign In</Button>
            }

          </div>
       </div>
        

      </div>
    </>
  );
};

export default Header;
