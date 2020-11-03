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
    console.log(props)
    const [triplist , setTripList] = useState([]);
    const [updateList, setUpdateList] = useState(false); 
    const [deleteList, setDeleteList] = useState({});  //Delete List 

    const fetchSavedListItems = (props) => {
        fetch('https://wanderlust-travel-hhsk.herokuapp.com/trips/all', {
            method: "GET",
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorizaton' : props.token,
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
    // useEffect(() => {
    //     fetchSavedListItems();
    // }, [])

    

     
    return (
        <Card className='cards'>

            <CardBody>
                <CardTitle>My Wandeful Destination</CardTitle>
                <CardText fetchSavedListItems={fetchSavedListItems} token={props.token}>Destination Information</CardText>

            </CardBody>
        </Card>
    )





    }

export default TripListPage;