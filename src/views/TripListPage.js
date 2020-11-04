import React, { useState, useEffect } from "react";
import "../styles/TripListPage.css";
import { Container, Col } from "reactstrap";
import TripViewPage from "./TripViewPage";
import TripEdit from "./TripEdit";

const TripListPage = (props) => {
  console.log(props);
  const [userTrips, setUserTrips] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [tripToUpdate, setTripToUpdate] = useState({});

  const fetchAllTrips = () => {
    fetch("https://wanderlust-travel-hhsk.herokuapp.com/trips/all", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((response) => response.json())
      .then((body) => setUserTrips(body))
      .catch((error) => console.log(error));
  };

  const editUpdateTrip = (trip) => {
    setTripToUpdate(trip);
  };

  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  };

  if (props.token && !userTrips) {
    fetchAllTrips();
  }

  useEffect(() => {
    fetchAllTrips();
  }, []);

  return (
    <div>
      <div>
        <Container>
          <Col md="9">
            {console.log("tripslist value", userTrips)}
            {userTrips ? (
              <TripViewPage
                trips={userTrips}
                fetchTrips={fetchAllTrips}
                token={props.token}
                editUpdateTrip={editUpdateTrip}
              />
            ) : null}
          </Col>
          <Col md="3">
            {updateActive ? (
              <TripEdit
                tripToUpdate={tripToUpdate}
                updateOff={updateOff}
                token={props.token}
                fetchAllTrips={fetchAllTrips}
              />
            ) : (
              <></>
            )}
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default TripListPage;
