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
      props.fetchAllTrips();
      props.updateOff();
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>What is your interest in this destination?</ModalHeader>
      <ModalBody>
        <Form onSubmit={tripUpdate}>
          <FormGroup>
            <Button type="submit" onClick={(e) => setRating(5)}>
              5 - ASAP!
            </Button>
            <Button type="submit" onClick={(e) => setRating(3)}>
              3 - This year
            </Button>
            <Button type="submit" onClick={(e) => setRating(1)}>
              1 - Someday
            </Button>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default TripEdit;
