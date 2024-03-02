import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import TicketService from "../services/api";

const Pnr = () => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [pnrStatus, setPnrStatus] = useState(null);
  const [cancelmsg, setCancelMsg] = useState("");

  const handleCheckPnrStatus = async () => {
    TicketService.getStatus(pnrNumber)
      .then((response) => {
        setPnrStatus(response);
        // setCancelMsg("NA");
      })
      .catch((error) => {
        console.error("Error checking PNR status:", error);
        // You can handle the error state or show a user-friendly message here
      });
  };
  const handleCancelTicket = () => {
    // Add logic to cancel the ticket based on the pnrNumber
    TicketService.cancelTicket(pnrNumber)
      .then((response) => {
        // setPnrStatus(null);
        console.log(response);
        setCancelMsg(response);
        // const cancel = response;
        console.log("Cancel Ticket for PNR:", pnrNumber);
      })
      .catch((error) => {
        console.error("Error cancelling Ticket:", error);
        // You can handle the error state or show a user-friendly message here
      });
  };

  return (
    <div className="pnr container">
      <h2 className="pnr-heading">Check PNR Status</h2>
      <Form>
        <FormGroup className="pnr-input">
          <input
            type="text"
            placeholder="Enter PNR Number"
            value={pnrNumber}
            onChange={(e) => setPnrNumber(e.target.value)}
            required
          />
        </FormGroup>
        <div className="check-button">
          <Button type="button" onClick={handleCheckPnrStatus}>
            Check PNR Status
          </Button>
        </div>
      </Form>
      {pnrStatus &&
        (cancelmsg == "" ? (
          <Card className="details-card">
            <div className="details-row">
              <CardBody className="details-body">
                <CardTitle tag="h2">Ticket Details</CardTitle>
                <hr className="dotted-line" />
                <CardText>
                  <strong>PNR Number:</strong> {pnrStatus.pnrNumber}
                </CardText>
                <CardText>
                  <strong>Source:</strong> {pnrStatus.source}, <br />
                  <strong>Destination:</strong> {pnrStatus.destination}, <br />
                  <strong>Seat Class:</strong> {pnrStatus.seatClass},{" "}
                  <strong>Coach:</strong> {pnrStatus.coach}, <br />
                  <strong>Train Number:</strong> {pnrStatus.trainNumber}, <br />
                  <strong>Date:</strong> {pnrStatus.date},{" "}
                  <strong>Arrival Time:</strong> {pnrStatus.arrivalTime},{" "}
                  <strong>Departure Time:</strong> {pnrStatus.departureTime},{" "}
                </CardText>
                {/* <CardText> */}

                {pnrStatus.passengers.map((passenger) => (
                  <div className="passenger" key={passenger.passengerId}>
                    <CardText>
                      {/* <strong>Passenger:</strong><br/> */}
                      <strong>Name:</strong> {passenger.passengerName}, <br />
                      <strong>Age:</strong> {passenger.age}, <br />
                      <strong>Seat Number:</strong> {passenger.seatNumber}
                    </CardText>
                  </div>
                ))}
                {pnrStatus.statuses.map((status) => (
                  <div className="status" key={status}>
                    <CardText
                      style={{
                        color: status === "CONFIRMED" ? "green" : "red",
                      }}
                    >
                      {/* <strong>Status:</strong> */}
                      <strong>{status} </strong>
                      {status && (
                        <button
                          className="cancel-button"
                          onClick={handleCancelTicket}
                        >
                          Cancel Ticket
                        </button>
                      )}
                    </CardText>
                  </div>
                ))}
                {/* </CardText> */}
                {/* <div className="status"> */}
                {/* <CardText> */}

                {/* </CardText> */}
                {/* </div> */}
              </CardBody>
            </div>
          </Card>
        ) : (
          <>
            {
              <Card className="details-card">
                <div className="details-row">
                  <CardBody className="details-body">
                    <div className="cancel-ticket">
                      <h2>{cancelmsg}</h2>
                    </div>
                  </CardBody>
                </div>
              </Card>
            }
          </>
        ))
        // :(
        //     <>
        //     {
        //       <p>No tickets!!</p>
        //     }
        //   </>
        // )
        }
    </div>
  );
};

export default Pnr;
