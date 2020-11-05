import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "../styles/TripEdit.css";

const TripEdit = (props) => {
  const [rating, setRating] = useState();

  const tripUpdate = (event, trip) => {
    event.preventDefault();
    fetch(
      ` https://wanderlust-travel-hhsk.herokuapp.com/trips/${props.tripToUpdate.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ trip: { rating: rating } }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      }
    ).then((response) => {
      props.fetchAllTrips();
      props.updateOff();
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader className="editHeader">
        What is your interest in this destination?
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={tripUpdate}>
          <FormGroup className="updateButtons">
            <Button id="asap" type="submit" onClick={(e) => setRating(5)}>
              Go ASAP!
            </Button>
            <Button id="thisYear" type="submit" onClick={(e) => setRating(3)}>
              Go This Year
            </Button>
            <Button id="someday" type="submit" onClick={(e) => setRating(1)}>
              Go Someday
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TripEdit;
