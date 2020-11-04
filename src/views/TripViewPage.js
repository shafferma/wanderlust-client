import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
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
        <tr key={index}>
          <th scope="row">{trip.location}</th>
          <td>{trip.description}</td>
          <td>{trip.sites}</td>
          <td>{trip.rating}</td>
          <td>
            <Button
              color="warning"
              onClick={() => {
                editUpdateTrip(trip);
                props.updateOn();
              }}
            >
              Update
            </Button>
            <Button
              color="danger"
              onClick={() => {
                deleteTrip(trip);
              }}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h3>My Trips</h3>
      <hr />
      <Container className="tripViewTable">
        {trips?.length ? (
          <div id="tripTable">
            <CardColumns>
              <Card md="8">
                <Table striped width="250%">
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Sites to See</th>
                      <th>Interest</th>
                    </tr>
                  </thead>
                  <tbody>{tripMapper()}</tbody>
                </Table>
              </Card>
            </CardColumns>
          </div>
        ) : (
          <h1>See Your Saved Trips Here!</h1>
        )}
      </Container>
    </>
  );
};

export default TripViewPage;
