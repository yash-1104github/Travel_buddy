import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input"
import { AI_PROMPT } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { chatSession } from "@/service/AIModel";
import { setDoc, doc,  } from "firebase/firestore"; 
import { app, db } from "@/service/firebaseCongfig";
import { useNavigate } from "react-router-dom";
import Budget from "./components/Budget";
import Member from "./components/Member";



function CreateTrip() {
    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const [loading, setLoading] = useState(false);
 
    
    const naviagate=useNavigate();


    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])



    const GenerateTrip = async () => {

        if (formData?.noOfDays > 8){
            toast('Please select days less than 8');
            return;
        }

        if ( !formData?.location || !formData?.budget || !formData?.traveler) {
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

        const result = await chatSession.sendMessage(FINAL_PROMPT);

        //console.log(result?.response?.text());

        setLoading(false);
        SaveAiTrip(result?.response?.text());
    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);

        console.log('TripData:', TripData)
     
      try{
          const docID = Date.now().toString();

          await setDoc(doc(db, "tripinfo", docID),{
              userSelection: formData,
              tripData: JSON.parse(TripData),
              id: docID,             
          });

          setLoading(false);
          naviagate('/view-trip/'+docID);

      }
      catch(error){
          console.log('Error:', error);
          setLoading(false);
      }
    }

        return (
            <div className="px-28 mt-5  sm:px-20 md:px-32 lg:px-56 xl:px-72 ">
                <h2 className="font-bold text-3xl ">Tell us your travel preferences</h2>
                <p className="mt-3 text-gray-500 text-xl">Just provide some basic information, and our trip planner will generate a  customized itineray based on your preferences.</p>

                <div className="mt-10 flex flex-col gap-10">
                    <div>
                        <h2 className="text-xl my-3 font-medium">What is destination of choice?</h2>
                        <GooglePlacesAutocomplete
                            apikey={import.meta.env.VITE_GOOGLE_API_KEY}
                            selectProps={{
                                place,
                               onChange: (v) => { setPlace(v); handleChange('location', v) }
                            }}
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
                        <Input placeholder="Enter number of days" type="number"
                            onChange={(e) =>
                                handleChange('noOfDays', e.target.value)} />
                    </div>
                </div>

                   <Budget formData={formData} handleChange={handleChange}/>

                   <Member formData={formData} handleChange={handleChange}/>

                <div className="my-10 justify-end flex">
                    <Button disable={loading} onClick={GenerateTrip}>
                    {loading? 'Generating...'
                    : 'Generate Trip Plan'}
                   </Button>
                </div>

            </div>
        )};

    export default CreateTrip;
