import axios from "axios";

// /*sample data*/
// const  fetchTrainDetails = [
//     {
//       Type: 'AC',
//       Train_Coach: 'ABC123',
//       From: 'Howrah',
//       To: 'Durgapur',
//     //   Passenger: 40,
//       Check_In_Date: '01-01-2024',
//     },
//     {
//       Type: 'General',
//       Train_Coach: 'EFG123',
//       From: 'Howrah',
//       To: 'Digha',
//     //   Passenger: 50,
//       Check_In_Date: '01-04-2024',
//     },
//     {
//         Type: 'AC',
//         Train_Coach: 'HIJ123',
//         From: 'Howrah',
//         To: 'Digha',
//       //   Passenger: 50,
//         Check_In_Date: '01-04-2024',
//     },

// ];

// export default fetchTrainDetails;

//All api calls ======>

/* Get deyails of all trains */
// const base_url ="https://freeapi.miniprojectideas.com/api/TrainApp";

// export const getAllTrains = () => {
//     return axios.get(`${base_url}/GetAllTrains`)
//       .then((response) => {
//         return response.data.data.sort((a, b) => a.trainId - b.trainId);
//       })
//       .catch((error) => {
//         console.error(error);
//         throw error;
//       });
// };

// export const getAllUserDetails = () => {
//     return axios.get(`${base_url}/GetAllPassengers`)
//       .then((response) => {
//         return response.data.data;
//       })
//       .catch((error) => {
//         console.error(error);
//         throw error;
//       });
// };

// // Function to add a new passenger
// export const addPassenger = (passengerData) => {
//     return axios.post(`${base_url}/AddPassenger`, passengerData)
//       .then((response) => {
//         return response.data; // You can customize the return based on your API response
//       })
//       .catch((error) => {
//         console.error(error);
//         throw error;
//       });
//   };

// export const createBooking = (bookingData) => {
//     return axios.post(`${base_url}/CreateBooking`, bookingData)
//       .then((response) => {
//         return response.data; // You can return the response if needed
//       })
//       .catch((error) => {
//         console.error(error);
//         throw error;
//       });
// };

// import axios from 'axios';

// import axios from 'axios';

// const API_BASE_URL = "https://freeapi.miniprojectideas.com/api/TrainApp";


const API_BASE_URL = "http://192.168.137.1";
const token = localStorage.getItem('token');
const config = {
  headers: {
    'Authorization': token ? `Bearer ${token}` : null,
  }
}


const TicketService = {
  authenticateUser: (email, password) => {
    return axios
      .post(
        `${API_BASE_URL}:5874/auth-service/authenticate/${encodeURIComponent(email)}/${encodeURIComponent(password)}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error authenticating user:", error);
        throw error;
      });
  },
  addPassengers: (passengerData) => {
    return axios
      .post(`${API_BASE_URL}:9568/user-service/create-user`, passengerData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding/updating passengers:", error);
        throw error;
      });
  },

  getUserByEmail: (email) => {
    return axios
      .get(
        `${API_BASE_URL}:9568/user-service/get-user-by-email/${encodeURIComponent(
          email
        )}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetfching user by email:", error);
        throw error;
      });
  },
  getAllTrains: () => {
    // console.log('Token:', token);
    return axios
      .get(`${API_BASE_URL}:5489/train-service/get-all-trains`, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching stations:", error);
        throw error;
      });
  },
  getTrainBetweenStations: (start,end) => {
    return axios
      .get(
        `${API_BASE_URL}:5489/train-service/trains/${encodeURIComponent(start)}/${encodeURIComponent(end)}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting train:", error);
        throw error;
      });
  },
  getTrainById: (id) => {
    return axios
      .get(`${API_BASE_URL}:5489/train-service/${id}`, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting trainbyId:", error);
        throw error;
      });
  },
  bookTicket: (tickets, bookingData) => {
    return axios
      .post(`${API_BASE_URL}:6485/ticket-service/book/tickets/${encodeURIComponent(tickets)}`,bookingData, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error bookingTicket:", error);
        throw error;
      });
  },
  getStatus: (pnr) => {
    return axios
      .get(`${API_BASE_URL}:6485/ticket-service/check-tickets-status/by/pnr-number/${encodeURIComponent(pnr)}`, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting ticket status:", error);
        throw error;
      });
  },
  getStatus: (pnr) => {
    return axios
      .get(`${API_BASE_URL}:6485/ticket-service/check-tickets-status/by/pnr-number/${encodeURIComponent(pnr)}`, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting ticket status:", error);
        throw error;
      });
  },
  cancelTicket: (pnr) => {
    return axios
      .delete(`${API_BASE_URL}:6485/ticket-service/cancel/tickets/${encodeURIComponent(pnr)}`, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error getting ticket status:", error);
        throw error;
      });
  },



  //ADMIN
  createTrain: (train) => {
    return axios
      .post(`${API_BASE_URL}:5489/train-service/create`,train, config)
      .then((response)=>response.data)
      .catch((error)=>{
        console.error("Error getting ticket status:", error);
        throw error;
      })
  },
  getAllUsers: () => {
    return axios
      .get(`${API_BASE_URL}:9568/user-service/get-all-users`, config)
      .then((response)=>response.data)
      .catch((error)=>{
        console.error("Error getting ticket status:", error);
        throw error;
      })
  },
  getAllTickets: (trainNumber) => {
    // console.log('Token:', token);
    return axios
      .get(`${API_BASE_URL}:6485/ticket-service/get-all/by/train-number/${encodeURIComponent(trainNumber)}`, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching tickets:", error);
        throw error;
      });
  },
  





  //not implemented
  addBulkTrainStations: (data) => {
    return axios
      .post(`${API_BASE_URL}/AddBulkTrainStations`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error adding bulk train stations:", error);
        throw error;
      });
  },

  getAllPassengers: () => {
    return axios
      .get(`${API_BASE_URL}/GetAllPassengers`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching passengers:", error);
        throw error;
      });
  },
  // deleteStationByStationId: (stationId) => {
  //   return axios
  //     .delete(`${API_BASE_URL}/DeleteStationByStationId?stationId=${stationId}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error("Error deleting station:", error);
  //       throw error;
  //     });
  // },

  // login: (credentials) => {
  //   return axios.post(`${API_BASE_URL}/Login`, credentials)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error("Error logging in:", error);
  //       throw error;
  //     });
  // },

  // addUpdatePassengers: (passengerData) => {
  //   return axios.post(`${API_BASE_URL}/AddUpdatePassengers`, passengerData)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error("Error adding/updating passengers:", error);
  //       throw error;
  //     });
  // },

  deletePassengerByPassengerId: (passengerId) => {
    return axios
      .delete(
        `${API_BASE_URL}/DeletePassengerByPassengerId?passengerId=${passengerId}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting passenger:", error);
        throw error;
      });
  },

  // getAllTrains: () => {
  //   return axios
  //     .get(`${API_BASE_URL}/GetAllTrains`)
  //     .then((response) =>
  //       response.data.data.sort((a, b) => a.trainId - b.trainId)
  //     )
  //     .catch((error) => {
  //       console.error("Error fetching trains:", error);
  //       throw error;
  //     });
  // },

  // getTrainsBetweenStations: (searchObj) => {
  //   const { fromStationId, toStationId, dateOfTravel } = searchObj;
  //   return axios
  //     .get(
  //       `${API_BASE_URL}/GetTrainsBetweenStations?departureStationId=${fromStationId}&arrivalStationId=${toStationId}&departureDate=${dateOfTravel}`
  //     )
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error("Error fetching trains between stations:", error);
  //       throw error;
  //     });
  // },

  // addNewTrain: (trainData) => {
  //   return axios
  //     .post(`${API_BASE_URL}/AddNewTrain`, trainData)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error("Error adding new train:", error);
  //       throw error;
  //     });
  // },

  // deleteTrainByTrainId: (trainId) => {
  //   return axios
  //     .delete(`${API_BASE_URL}/DeleteTrainByTrainId?trainId=${trainId}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error("Error deleting train:", error);
  //       throw error;
  //     });
  // },

  getTrainBookings: () => {
    return axios
      .get(`${API_BASE_URL}/GetTrainBookings`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching train bookings:", error);
        throw error;
      });
  },

  getAllTrainsBookingsPassengerList: () => {
    return axios
      .get(`${API_BASE_URL}/GetAllTrainsBookingsPassengerList`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching train bookings passenger list:", error);
        throw error;
      });
  },

  getTrainBookingPassengerListByTrainId: (trainId) => {
    return axios
      .get(
        `${API_BASE_URL}/GetTrainBookingPassengerListByTrainId?trainId=${trainId}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "Error fetching train booking passenger list by train id:",
          error
        );
        throw error;
      });
  },

  getBookingByPassengerId: (passengerId) => {
    return axios
      .get(`${API_BASE_URL}/GetBookingByPassengerId?passengerId=${passengerId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching booking by passenger id:", error);
        throw error;
      });
  },

  bookTrain: (bookingData) => {
    return axios
      .post(`${API_BASE_URL}/BookTrain`, bookingData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error booking train:", error);
        throw error;
      });
  },

  cancelBookingByBookingId: (bookingId) => {
    return axios
      .delete(`${API_BASE_URL}/CancelBookingByBookingId?bookingId=${bookingId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error canceling booking by booking id:", error);
        throw error;
      });
  },
};

export default TicketService;
