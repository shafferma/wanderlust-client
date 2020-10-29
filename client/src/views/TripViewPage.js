import React, {useState, useEffect} from 'react';
import {Button, Card, CardBody, CardColumns, CardImg, Col,Container,Row,Table} from 'reactstrap'
import '../styles/TripViewPage.css'

const TripViewPage = (props) =>{
    
//     const deleteTripInfo = (tripInfo) =>{  //! need to change tripinfo
//             fetch(`http://localhost:3000/log/${tripInfo.id}`,{  //! need to change tripinfo
//                 method: 'DELETE',
//                 headers: new Headers({
//                     'Content-Type': 'application/json',
//                     'Authorization': props.token
//                 })
//             })
//             .then(()=>props.fetchTrips())  //! need to change
//         }
    
    // const tripMapper =()=>{
    //         return props.tripInfo.map((tripInfo,index)=>{  {/*//! need to change tripInfo*/}
    //             return(
    //                 <tr key={index}>
    //                     <th scope="row">{tripInfo.id}</th> {/*//! need to change tripInfo*/}
    //                     <td>{tripInfo.result}</td> {//! need to change tripInfo}
    //                     <td>{tripInfo.description}</td> {/*//! need to change tripInfo*/}
    //                     <td>{tripInfo.definition}</td>{/*//! need to change tripInfo*/}
    //                     <td>
    //                         <Button color="warning" onClick={()=>{props.editUpdateTrip(tripInfo);props.updateOn()}}>Update</Button> {/*//!may need to change editUpdateTrip and tripInfo*/}
    //                         <Button color="danger" onClick={()=>{deleteTripInfo(tripInfo)}}>Delete</Button>  {/*//! may need to chagne deleteTripInfo & tripInfo*/}
    //                     </td>
    //                 </tr>
    //             )
    //         })
    //     }
    
    
    
        return(
            <>
            
            <h3>Trip </h3>
            <hr/>
            <Container className="tripViewTable">
           <div id="tripTable">
           <CardColumns>
            <Card md="8">
           
            <Table striped width="250%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Trip Information</th>
                        <th>Possible other Info</th>
                        <th>More Possible Info</th>
                    </tr>
                </thead>
                <tbody>
                    <td>1</td>
                    <td>jjki;lkjl;ajldfj;</td>
                    <td>kjljiljklj</td>
                    <td>kjoilqqdial</td>
                    
                    {/* {tripMapper()} */}
                </tbody>
            </Table>
            </Card>
           
            
            
            
            
            </CardColumns>
            </div>
            
           <div>    
            <CardColumns>
           <Card md="4">
                <CardBody>
                    <CardImg id="tripImage" top width="75%" src='https://live.staticflickr.com/65535/50542803582_c630c193af_c.jpg'></CardImg>
                </CardBody>
            </Card>
           
            </CardColumns>
            </div>
            </Container>
            </>
        )
    }
    
    
    export default TripViewPage;