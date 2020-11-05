import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardColumns,
  CardImg,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import "../styles/TripViewPage.css";

const TripViewPage = (props) => {
  console.log(props);
  const { trips, fetchTrips, token, editUpdateTrip } = props;
  const deleteTrip = (trip) => {
    fetch(`https://wanderlust-travel-hhsk.herokuapp.com/trips/${trip.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(() => props.fetchTrips());
  };

  const tripMapper = () => {
    return trips.map((trip, index) => {
      return (
        <Card className="tripCard" key={index}>
          <CardHeader className="cardHeader">
            <b>{trip.location}</b>
          </CardHeader>
          <CardBody className="cardBody">
            <Row id="cardDescription">{trip.description}</Row>
            <hr />
            <Row>
              <b>Sites to See:</b>
            </Row>
            <Row id="cardSites">{trip.sites.split('"')}</Row>{" "}
            {/*trips.sites.values()*/}
            <hr />
            <Row id="cardInt">
              <b>Trip Interest:</b>{" "}
              {trip.rating == 5 ? (
                <p id="highInt">Go ASAP</p>
              ) : trip.rating == 3 ? (
                <p id="mediumInt">Go This Year</p>
              ) : trip.rating == 1 ? (
                <p id="lowInt">Go Someday</p>
              ) : (
                <></>
              )}
            </Row>
          </CardBody>
          <CardFooter className="cardFooter">
            <Col id="updateCol" md="6">
              <Button
                onClick={() => {
                  editUpdateTrip(trip);
                  props.updateOn();
                }}
              >
                Update
              </Button>
            </Col>
            <Col id="deleteCol" md="6">
              <Button
                onClick={() => {
                  deleteTrip(trip);
                }}
              >
                Delete
              </Button>
            </Col>
          </CardFooter>
        </Card>
      );
    });
  };

  return (
    <>
      <h3 id="tripsHeader">My Trips</h3>
      <hr />
      {trips?.length ? (
        <Container id="tripTable">{tripMapper()}</Container>
      ) : (
        <h1>See Your Saved Trips Here!</h1>
      )}
    </>
  );
};

export default TripViewPage;

// return (
//   <>
//     <h3>My Trips</h3>
//     <hr />
//     <Container className="tripViewTable">
//       {trips?.length ? (
//         <div id="tripTable">
//           <CardColumns>
//             <Card md="8">
//               <Table striped width="250%">
//                 <thead>
//                   <tr>
//                     <th>Location</th>
//                     <th>Description</th>
//                     <th>Sites to See</th>
//                     <th>Interest</th>
//                   </tr>
//                 </thead>
//                 <tbody>{tripMapper()}</tbody>
//               </Table>
//             </Card>
//           </CardColumns>
//         </div>
//       ) : (
//         <h1>See Your Saved Trips Here!</h1>
//       )}
//     </Container>
//   </>
// );
// };
