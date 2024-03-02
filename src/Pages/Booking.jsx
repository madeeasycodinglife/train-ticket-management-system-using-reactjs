import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Button, Table } from "reactstrap";
import TicketService from "../services/api";
import cryptoRandomString from "crypto-random-string";

const Booking = () => {
  const { trainId, type } = useParams();
  const [train, setTrain] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [passengerList, setPassengerList] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [passengerAge, setPassengerAge] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchTrainsAndPassengers = async () => {
  //     try {
  //       const trainsData = await TicketService.getTrainbyId(trainName);
  //       console.log(trainsData)
  //       const response = await TicketService.getAllPassengers();

  //       // Check if the response has a 'data' property that is an array before updating the state
  //       if (Array.isArray(response.data)) {
  //         setPassengers(response.data);
  //       } else {
  //         console.error("Invalid data for passengers:", response);
  //       }

  //       // Update the state for trains (assuming trainsData is an array)
  //       setTrains(trainsData);
  //     } catch (error) {
  //       console.error("Error fetching trains and passengers:", error);
  //     }
  //   };

  //   fetchTrainsAndPassengers();
  // }, []);

  useEffect(()=>{
    const fetchTrain = async () => {
      try {
              const trainData = await TicketService.getTrainById(trainId);
              console.log(trainData)
              // Update the state for trains (assuming trainsData is an array)
              setTrain(trainData);
            } catch (error) {
              console.error("Error fetching trains and passengers:", error);
            }
    };
    fetchTrain();  
  },[]);
  const handleAddPassenger = () => {
    // Check if there is a matching passenger before adding to the list
    // const selectedPassenger = passengers.find((passenger) => {
    //   const fullName = `${passenger.firstName} ${passenger.lastName}`;
    //   return fullName.toLowerCase() === passengerName.trim().toLowerCase();
    // });

    // if (selectedPassenger) {
      const newPassenger = {
        passengerName: passengerName,
        age: passengerAge,
      };
      setPassengerList([...passengerList, newPassenger]);
    //   setPassengerName("");
    //   setPassengerAge("");
    // } else {
    //   // Display an alert if no matching passenger found
    //   alert("No matching passenger found. Please check the passenger name.");
    // }
  };

  const handleCreateBooking = () => {
    console.log("Selected Train:", train);
  
    // Assuming trainName corresponds to the trainId, you can directly use it
    const selectedTrain = {
      trainId: trainId,
    };
  
    console.log("Selected Train:", selectedTrain);
  
    // Assuming passengerList is used instead of selectedPassenger
    if (passengerList.length > 0 && numberOfTickets > 0) {
      // const bookingData = {
      //   // Assuming trainId is directly obtained from trainName
      //   trainId: selectedTrain.trainId,
      //   travelDate: new Date().toISOString(),
      //   bookingDate: new Date().toISOString(),
      //   totalSeats: passengerList.length,
      //   TrainAppBookingPassengers: passengerList.map((passenger, index) => ({
      //     bookingPassengerId: index + 1,
      //     passengerName: passenger.passengerName,
      //     seatNo: index + 1,
      //     age: passenger.age,
      //   })),
      // };
      const bookingData = {
        seatClass: type,
        trainNumber: train.trainNumber,
        date: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
        passengers: passengerList.map((passenger) => ({       
            passengerName: passenger.passengerName,
            age: passenger.age,
        })),
      }
  
      console.log("Booking Data:", bookingData);
  
      
      if (bookingData.passengers.length == numberOfTickets) {
        // Assuming you have a function to book the train in TicketService
        // TicketService.bookTicket(numberOfTickets,bookingData)
        //   .then((response) => {
        //     console.log("Train booked successfully:", response);
        //     // Clear input fields after the booking is created
        //     setPassengerName("");
        //     setPassengerAge("");
        //     navigate(`/payment/${trainId}/${bookingData.passengers.length}`);
        //   })
        //   .catch((error) => {
        //     console.error("Error booking train:", error);
        //   });
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
        navigate(`/payment/${trainId}${cryptoRandomString({ length: 8, type: "alphanumeric" })}/${bookingData.passengers.length}`);
    
      } else if(bookingData.passengers.length == 0){
        alert("Select passengers!");
      }else{
        alert("Not enough passengers!!");
      }
    } else {
      console.error("No passengers selected for booking");
      alert("Select passengers!");
    }
  };

  return (
    <div className="booking container ">
      <div className="sectionContainer grid">
      <p>Booking for train: {trainId} &nbsp;&nbsp;&nbsp;&nbsp; Class type: {type}</p>
      <Form>
        <FormGroup className="ticketsinput">
          <input
              type="number"
              placeholder="Number of Tickets"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(e.target.value)}
              required
            />
        </FormGroup>
        <FormGroup className="bookinginput">
          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Passenger Age"
            value={passengerAge}
            onChange={(e) => setPassengerAge(e.target.value)}
            required
          />
          <Button type="button" onClick={handleAddPassenger}>
            Add Passenger
          </Button>
        </FormGroup>
      </Form>
      {passengerList.length > 0 && (
        <Table className="booking-table"> 
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {passengerList.map((passenger, index) => (
              <tr key={index}>
                <td>{passenger.passengerName}</td>
                <td>{passenger.age}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div className="booking-btn">
      <Button type="button" onClick={handleCreateBooking}>
        Create Booking
      </Button>
      </div>
    </div>
    </div>
  );
};

export default Booking;
