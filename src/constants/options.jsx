export const SelectTravelLists=[
    {
        id:1,
        title:"Just Me",
        description:"I am traveling alone",
        icon:"✈️",
        people:'1'
    },
    {
        id:2,
        title:"A Couple",
        description:"Two of us are traveling together",
        icon:"👫",
        people:'2 People'
    },
    {
        id:3,
        title:"Family",
        description:"A group of us are traveling together",
        icon:"🏠",
        people:'3 to 5 People'
    },
    {
        id:4,
        title:"Friends",
        description:"A bunch of us are traveling together",
        icon:"🚢",
        people:'more than 5 People'
    },
]

export const SelectBudgetOptions = [
    {
        id:1,
        title:"Cheap",
        description:"Stay conscious of my budget",
        icon:"💰",
    },
    {
        id:2,
        title:"Moderate",
        description:"Keep costs on average side",
        icon:"💵",
    },
    {
        id:3,
        title:"Luxury",
        description:"I am looking for luxury options",
        icon:"💳",
    }
]

export const AI_PROMPT ='Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget,Give me a Hotels options list with HotelName,Hotel address,Price range in rupees if indian otherwise  in dollar per night,hotel image url, geo coordinates, rating, descriptions and suggest itinerary   with  placeName, place  detail, place image URL, Geo coordinates, ticket pricing ,Time t Travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format and schedule each day in hours time periods starting from 10pm to 7pm with each section of time should and divided to travel each places on that day.';

