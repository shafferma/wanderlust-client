import React, { useState, useEffect } from "react";
import "../styles/TripListPage.css";
import TripViewPage from "./TripViewPage";
import TripEdit from "./TripEdit";
import {
  Card,
  Col,
  CardBody,
  CardText,
  CardTitle,
  CardLink,
  CardSubtitle,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const TripListPage = (props) => {
  console.log(props);
  const [userTrips, setUserTrips] = useState([]);
  const [updateActive, setUpdateActive] = useState(false);
  const [tripToUpdate, setTripToUpdate] = useState({});
  const [modalOpen, setModalOpen] = useState();

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
    if (props.token) fetchAllTrips();
  }, [props.token]);

  const toggleModal = () => setModalOpen(!modalOpen);
  // const { addToast } = useToasts();
  // useEffect(() => {
  //   addToast("Saved Successfully", { appearance: "success" });
  // }, []);
  // form submission handling
  // const onSubmit = async (value) => {
  //   fetch("https://wanderlust-travel-hhsk.herokuapp.com/trips/new", {
  //     headers: {
  //       Authorization: props.token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((body) => {
  //       setUserTrips(body.results);
  //       addToast("Saved Successfully", { appearance: "success" });
  //     })
  //     .catch((error) => {
  //       addToast(error.message, { appearance: "error" });
  //     });
  // };

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
