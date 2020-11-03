import React, { useState, useEffect } from "react";
import "../styles/TripListPage.css";
import {
  Card,
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


const TripListPage = (props) => {
    const [triplist , setTripList] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [deleteList, setDeleteList] = useState({});

    const fetchSavedListItems = (props) => {
        fetch('https://wanderlust-travel-hhsk.herokuapp.com/trips/all', {
            method: "GET",
            header: new Headers({
                'Content-Type': "application/json",
                'Authorizaton' : props.token
            })
        }).then((results => results.json())
        .then((results) => {
            setTripList(results)
        }) 
          
      )}
    const editSetUpdateList = (triplist) => {
        setUpdateList(triplist);
        console.log(props.results)
    }
    const updateOn = () => {
        setUpdateList(true);
    }
    const updateOff = () => {
        setUpdateList(false);
    } 
    useEffect(() => {
        fetchSavedListItems();
    }, [])

    return (
        <Card>
            <CardBody>
                <CardTitle>My Wandeful Destination</CardTitle>
                <CardText>Destination Information</CardText>

            </CardBody>
        </Card>
    )





    }

export default TripListPage;