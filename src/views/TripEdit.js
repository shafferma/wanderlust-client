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
      // props.fetchAllTrips();
      props.updateOff();
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>What is your interest in this destination?</ModalHeader>
      <ModalBody>
        <Form onSubmit={tripUpdate}>
          <FormGroup>
            <Button>ASAP!</Button>
            <Button>This year</Button>
            <Button>Someday</Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TripEdit;
