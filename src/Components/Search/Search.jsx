import React from "react";
import { useState, useEffect } from "react";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { MdOutlineDateRange } from "react-icons/md";
import { SectionWrapper } from "../../hoc";
// import axios from 'axios';

// import base_url from '../../services/api';
import Train from "../Train/Train";
// import fetchTrainDetails from '../../services/api'
// import { getAllTrains } from '../../services/api';
import TicketService from "../../services/api";

/*sample data*/
// const fetchTrainDetails = [
//   {
//     Type: 'AC',
//     Train_Coach: 'ABC123',
//     From: 'Howrah',
//     To: 'Durgapur',
//     Seats_Available: 40,
//     Check_In_Date: '2024-01-01',
//   },
//   {
//     Type: 'General',
//     Train_Coach: 'EFG123',
//     From: 'Howrah',
//     To: 'Digha',
//     Seats_Available: 50,
//     Check_In_Date: '2024-04-01',
//   },
//   {
//     Type: 'AC',
//     Train_Coach: 'HIJ123',
//     From: 'Howrah',
//     To: 'Digha',
//     Seats_Available: 50,
//     Check_In_Date: '2024-01-04',
//   },
// ];

const Search = () => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [selectedCoach, setSelectedCoach] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [requiredSeats, setRequiredSeats] = useState("");

  const [trains, setTrains] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    if (searchFrom && searchTo) {
      console.log(searchFrom)
      console.log(searchTo)
      TicketService.getTrainBetweenStations(searchFrom.toLowerCase(), searchTo.toLowerCase())
        .then((data) => {
          console.log(data);//check
          setTrains(data);
          const newHeaders = data.length > 0 ? Object.keys(data[0]) : [];
          setHeaders(newHeaders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchFrom, searchTo]);

  const filteredTrainDetails = trains.filter((train) => {
    return (
      (selectedCoach === '' || train.classes.some(coach => coach.className.toLowerCase() === selectedCoach.toLowerCase()))
      // (!requiredSeats || train.totalSeats - train.bookedSeats >= parseInt(requiredSeats, 10))
      // (!searchDate || new Date(train.departureDate) >= new Date(searchDate))
    );
  });
  // const headers = Object.keys(fetchTrainDetails[0]);// used in static data for fetching

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className="btns flex">
          <div
            className={`singleBtn ${selectedCoach === "AC" ? "active" : ""}`}
            onClick={() => setSelectedCoach("AC")}
          >
            <span>AC Coach</span>
          </div>
          <div
            className={`singleBtn ${
              selectedCoach === "General" ? "active" : ""
            }`}
            onClick={() => setSelectedCoach("General")}
          >
            <span>General Coach</span>
          </div>
          <div
            className={`singleBtn ${selectedCoach === "Sleeper" ? "active" : ""}`}
            onClick={() => setSelectedCoach("Sleeper")}
          >
            <span>Sleeper Coach</span>
          </div>
        </div>

        <div className="searchInputs flex">
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>From</h4>
              <input
                type="text"
                placeholder="Where from? "
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
              />
            </div>
          </div>
          {/* Single Input */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>Destination</h4>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
              />
            </div>
          </div>
          {/* Travelers */}
          <div className="singleInput flex">
            <div className="iconDiv">
              <MdOutlineDateRange className="icon" />
            </div>
            <div className="texts">
              <h4>Passengers</h4>
              <input
                type="text"
                placeholder="Add passengers"
                value={requiredSeats}
                onChange={(e) => setRequiredSeats(e.target.value)}
              />
            </div>
          </div>
          {/* Single Input */}
          {/* <div className="singleInput flex">
            <div className="iconDiv">
              <MdOutlineDateRange className="icon" />
            </div>
            <div className="texts">
              <h4>Check-In Date</h4>
              <input
                type="date"
                placeholder="when?"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div> */}
          {/* <button className='btn btnBlock'>Search Trains</button> */}
        </div>
        {searchFrom || searchTo ? (
          <Train trains={filteredTrainDetails} headers={headers} type={selectedCoach} requiredSeats={requiredSeats}/>
        ) : null}
      </div>
    </div>
  );
};

export default SectionWrapper(Search, "search");
// export default Search
