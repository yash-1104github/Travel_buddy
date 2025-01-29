import React, { useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input"
import { AI_PROMPT } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { chatSession } from "@/service/AIModel";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseCongfig";
import { useNavigate } from "react-router-dom";
import Budget from "./components/Budget";
import Member from "./components/Member";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import useGoogleMapsAPI from "@/GoogeMap";





const CreateTrip = () => {


    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const [loading, setLoading] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const modalRef = useRef(null);

    const naviagate = useNavigate();


    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    useEffect(() => {
       
        const handleClickOutside = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenDialog(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
    


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => console.log(error)
    }
    )



    const GenerateTrip = async () => {

        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays > 8) {
            toast('Please select days less than 8');
            return;
        }

        if (formData?.noOfDays < 1) {
            toast('Please select days greater than 0');
            return;
        }

        if (!formData?.location || !formData?.budget || !formData?.traveler) {
            toast('Please fill all the details');
            return;
        }

        setLoading(true)

        //console.log('Generating Trip', formData);

        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        console.log(FINAL_PROMPT);

        //next line *
        const MAX_RETRIES = 10;
        const RETRY_DELAY = 2000;

        // const retryWithBackoff = async (fn, retries, delay) => {
        //     for (let i = 0; i < retries; i++) {
        //         try {
        //             return await fn();
        //         } catch (error) {
        //             if (error.code === 503 && i < retries - 1) {
        //                 console.warn(`Retrying... (${i + 1}/${retries})`);
        //                 await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i))); // Exponential backoff
        //             } else {
        //                 throw error; // Re-throw the error if retries are exhausted or non-503 error
        //             }
        //         }
        //     }
        // };


        const sendMessageWithRetries = async () => {
            for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
                try {
                    // Attempt to send the message
                    const result = await chatSession.sendMessage(FINAL_PROMPT);
                    return result; // If successful, return the result
                } catch (error) {
                    console.error(`Attempt ${attempt} failed:`, error);

                    if (error?.code === 503) {
                        // Service overloaded - retry
                        if (attempt < MAX_RETRIES) {
                            console.warn(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
                            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
                        } else {
                            // If max retries are exhausted, throw the error
                            throw new Error('Service is overloaded. Please try again later.');
                        }
                    } else {
                        // If the error is not a 503, throw it immediately
                        throw error;
                    }
                }
            }
        };


        try {
            //  const result = await retryWithBackoff(() => chatSession.sendMessage(FINAL_PROMPT), MAX_RETRIES, RETRY_DELAY);
            const result = await sendMessageWithRetries();
            console.log(result?.response?.text());
            SaveAiTrip(result?.response?.text());

        } catch (error) {
            console.log('Error:', error);
            toast('Server Error, Please Enter Details again...');
        } finally {
            setLoading(false);
        }
    }


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
            GenerateTrip();
        })
    }

    //save data on firebase
    const SaveAiTrip = async (TripData) => {

        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));

        console.log('TripData:', TripData)

        try {
            const docID = Date.now().toString();

            await setDoc(doc(db, "tripinfo", docID), {
                userSelection: formData,
                tripData: JSON.parse(TripData),
                userEmail: user?.email,
                id: docID,
            });

            setLoading(false);
            naviagate('/view-trip/' + docID);

        }
        catch (error) {
            //   console.log('Error:', error);
            setLoading(false);
            toast('Please Enter Details again...');
        }
    }

    return (
        <div className="flex flex-col  bg-gray-50 px-5 sm:px-20 md:px-32 lg:px-56 xl:px-72 ">
            <div className="w-full">
                <h2 className="font-bold text-4xl mt-4 text-[#f56551]">Tell us your travel preferences </h2>
            </div>

            <p className="mt-3  text-gray-800 text-lg sm:text-xl">Just provide some basic information, and our trip planner will generate a  customized itineray based on your preferences.</p>

            <div className="mt-6 flex flex-col gap-5">
                <h2 className="text-xl my-1 font-medium text-blue-800">What is destination of choice?</h2>
                <GooglePlacesAutocomplete
                    apikey={import.meta.env.VITE_GOOGLE_API_KEY}
                    selectProps={{
                        place,
                        onChange: (v) => { setPlace(v); handleChange('location', v) }
                    }}
                />
            </div>

            <div>
                <div>
                    <h2 className="text-xl my-3 font-medium text-blue-800">How many days are you planning your trip?</h2>
                    <Input className=" border rounded-lg " placeholder="Enter number of days" type="number"
                        onChange={(e) =>
                            handleChange('noOfDays', e.target.value)} />
                </div>
            </div>

            <Budget formData={formData} handleChange={handleChange} />

            <Member formData={formData} handleChange={handleChange} />

            <div className="my-10 justify-end flex">
                <Button disable={loading} onClick={GenerateTrip}>
                    {loading ? 'Generating...'
                        : 'Generate Trip Plan'}
                </Button>
            </div>


            <Dialog open={openDialog} >
                <DialogContent ref={modalRef} className="sm:max-w-md">
                    <DialogDescription>
                        <h2 className="font-bold text-lg flex text-black">Sign in with Google</h2>
                        <p className="flex "> Sign in to the App with Google authentication securly</p>
                    </DialogDescription>

                    <div className="flex gap-4 justify-between mt-5">
                        <Button onClick={login} className="  flex gap-4 w-full item-center">
                            <FcGoogle className='w-7 h-7 ' />
                            Sign in with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default CreateTrip;
