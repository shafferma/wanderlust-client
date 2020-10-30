import React, {useState, useEffect} from 'react'
import { Card, CardBody, CardText,CardTitle, CardLink, CardSubtitle, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom';


const TripListPage = (props) => {
    

    const [userLists, setUserList] = useState([]) //for creating user lists lists
    const [newListTitle, setNewListTitle] = useState('')// for creating new lists
    const modifyListTitle = (event) => setNewListTitle(event.target.value); //for changing the 
    const submitNewList = (event) => {
        event.preventDefault();
        setUserList([])

    }
    const createList =  (event) => {
        

    } 
   

   
    useEffect(() => {
        fetch('https://wanderlust-travel-hhsk.herokuapp.com/trips/new', {
            headers: {
                "Authorization": props.token,
            }
        })
        .then(response => response.json())
        .then(body => {
            setUserList(body.results);
        })
        .catch((error) => console.log(error))
    }, [])
     
    /* TODO Notes
    Cards(containter for api)
    A way or fuction to transfer information
    Images for each destination
    Do we want to to show on start up or / on toggle command?

    const [tripLists, setTripList] = useState([])
    const [listOpen, setLisOpen] = useState(false);
    
    
    
    return (
         <div>
            <h1> Time to make some Lists!</h1>
            
     */      
     
        return (
        <div id="listsview">
            <h1>Lets Make Some Lists</h1>
            <div className="listHeader">
                <div className='cards'>
                <Card>
                    <CardBody>
                        <CardTitle>Destination #1</CardTitle>
                        <CardSubtitle>City/State or Country/Territoru</CardSubtitle>
                        <CardBody>
                        <img src="/"  alt="Destination image" /> 
                        <CardText>information about destination</CardText>
                        <CardLink href="#">Link to API</CardLink>
                        </CardBody>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <CardTitle>Destination #2</CardTitle>
                        <CardSubtitle>City/State or Country/Territoru</CardSubtitle>
                        <CardBody>
                        <img src="/"  alt="Destination image" /> 
                        <CardText>information about destination</CardText>
                        <CardLink href="#">Link to API</CardLink>
                        </CardBody>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>Destination #3</CardTitle>
                        <CardSubtitle>City/State or Country/Territoru</CardSubtitle>
                        <CardBody>
                        <img src="/"  alt="Destination image" /> 
                        <CardText>information about destination</CardText>
                        <CardLink href="#">Link to API</CardLink>
                        </CardBody>
                    </CardBody>
                </Card>



            </div>
        </div>
    </div>
        )
}
export default TripListPage;
