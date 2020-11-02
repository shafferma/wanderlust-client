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
  const [userLists, setUserList] = useState([]); //for creating user lists lists
  const [modalOpen, setModalOpen] = useState(false);

  const [newListTitle, setNewListTitle] = useState(""); // for creating new lists

  const modifyListTitle = (event) => setNewListTitle(event.target.value); //for changing the

  const submitNewList = (event) => {
    event.preventDefault();
    setUserList([...userLists, { title: newListTitle }]);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    fetch("https://wanderlust-travel-hhsk.herokuapp.com/trips/new", {
      headers: {
        Authorization: props.token,
      },
    })
      .then((response) => response.json())
      .then((body) => {
        setUserList(body.results);
      })
      .catch((error) => console.log(error));
  }, []);

  /* TODO Notes
    Cards(containter for api)
    A way or fuction to transfer information
    Images for each destination???
    Do we want to to show on start up or / on toggle command?

    
    
    
    
     */

  return (
    <div>
      {
        //AN IDEA I WAS THINKING ABOUT
        /* <h1>Lets Make Some Lists</h1>

            <div className='lists'>
                <div className='listView'>
            
                    <Button color='success' onClick={toggleModal}>
                        New List
                    </Button>
                    <Modal isOpen={modalOpen} toggle={toggleModal}>
                        <ModalHeader>Create New List</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label htmlFor='newTitle'>Title:</Label>
                                    <Input type="text" id='newTitle' onChange={ modifyListTitle } value={newListTitle} />
                                </FormGroup>
                                </Form>
                                <Button color="warning" onCick={toggleModal}></Button>
                        </ModalBody>
                    </Modal>
                   </div>
                   {
                       userLists.legnth > 0
                       ? userLists.map(item => {
                           return (
                                <Card>
                                    <CardBody>
                                        <CardTitle>{item.title}</CardTitle>
                                     <CardText>{item.description}</CardText>
                                     <Button>View List Items</Button>
                                    </CardBody>
                                </Card>
                           )
                       })
                    :(
                        <h1>You have no Lists </h1>
                    )
                    }                   
                </div>  */
      }
      <div>
        <Container>
          <Card className="cards">
            <CardBody>
              <CardTitle>Destination #1</CardTitle>
              <CardSubtitle>What do I want to see?</CardSubtitle>
              <CardBody>
                <img src="/" alt="Destination image" />
                <CardText>information about destination</CardText>
                <Button outline color="secondary">
                  <CardLink href="#">Link to API</CardLink>
                </Button>
              </CardBody>
            </CardBody>
          </Card>
        </Container>
        <Container>
          <Card className="cards">
            <CardBody>
              <CardTitle>Destination #2</CardTitle>
              <CardSubtitle>What </CardSubtitle>
              <CardBody>
                <img src="/" alt="Destination image" />
                <CardText>information about destination?</CardText>
                <Button outline color="secondary">
                  <CardLink href="#">Link to API</CardLink>
                </Button>
              </CardBody>
            </CardBody>
          </Card>
        </Container>
        <Container>
          <Card className="cards">
            <CardBody>
              <CardTitle>Destination #3</CardTitle>
              <CardSubtitle>What do I want to see?</CardSubtitle>
              <CardBody>
                <img src="/" alt="Destination image" />
                <CardText>information about destination</CardText>
                <Button outline color="secondary">
                  <CardLink href="#">Link to API</CardLink>
                </Button>
              </CardBody>
            </CardBody>
          </Card>
        </Container>
        <Container>
          <Card className="cards">
            <CardBody>
              <CardTitle>Destination #4</CardTitle>
              <CardSubtitle>What do I want to see?</CardSubtitle>
              <CardBody>
                <img src="/" alt="Destination image" />
                <CardText>information about destination</CardText>
                <Button outline color="secondary">
                  <CardLink href="#">Link to API</CardLink>
                </Button>
              </CardBody>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default TripListPage;
