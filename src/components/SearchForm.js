import React, {useState, useEffect} from 'react';
import {Button, CustomInput, Form, FormGroup, Input, Label} from 'reactstrap';
import '../styles/SearchForm.css';


/*
    - user enters location
    - location then needs to be entered into getcoord location function to be able to grab longitude & latitude for anotherf fetch

*/

const SearchForm = () =>{
    
    // const [longitude,setLongitude]=useState('');
    // const [latitude,setLatitude]=useState('');
    const [search, setSearch]=useState();
    const [radius, setRadius]=useState();
    const [kinds, setKinds]=useState();  

    

    const getCoord = (event) =>{
        event.preventDefault();
       
        
        let key = process.env.REACT_APP_OPENTRIP_API_KEY      
        let url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${search}&apikey=${key}`   //* WORKS?
        console.log(url)

        //? below fetch pulls longitude and latitude from the api, to be reused in another fetch function
        fetch(url)  //? WORKS
        .then((response)=>response.json())  //? WORKS
        .then((data)=>{   //? WORKS
            let longitude = (data.lon);   //? WORKS
            let latitude = (data.lat)   //? WORKS
            
            
            
            let url2=`https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&kinds=${kinds}&format=json&apikey=${key}`
            console.log(url2);

            fetch(url2)
            .then((response)=>response.json())
            
            // .then((data)=>{
            //   for (let i=0; i<[].length; i++){
            //     let info=[i].name;
            //     console.log(info)
            //   }
            // })
        })
    }
/*
    1. user types in location,
    2. client then fires off a fetch to the api
    3. client then brings back longitude & latitude
    4. client then would push longitude and latitude to the next fetch

*/
    // useEffect(()=>{
    //     getCoord();
    // }, [])
    
    
    // * https://api.opentripmap.com/0.1/en/places/geoname?name=muncie_indiana&apikey=5ae2e3f221c38a28845f05b647f834925ea24e44fb12d1cbd631c42a
    // const handleSubmit handleSubmit=(e)=>{
    //     e.preventDefault();

    // }
/*  - need separate fetches for each item below?

import React, { useState, useEffect } from "react";
import { Button, CustomInput, Form, FormGroup, Label } from "reactstrap";

const SearchForm = (props) => {
  //     const handleSubmit handleSubmit=(e)=>{
  //         e.preventDefault();
  //         fetch(api url)
  //     }
  /*  - need separate fetches for each item below?

    - if accomodation = true then fetch from accomodation end point
    - if amusement parks = true then fetch from amusment park end point
    - etc, etc, etc
    - nested if statements
    ? do we choose location on this page or choose location on different page then get directed to this page
    




*/ 
  
    return (
      <div>  
        <Form onSubmit={(event)=>getCoord(event)}>
          <FormGroup>
            <Label>Choose a location:</Label>
            <Input type="text" name="search" onChange={(event)=>setSearch(event.target.value)} required placeholder="Enter a City"></Input>
          </FormGroup>
          <FormGroup>
          <Label>Select a distance radius:</Label>
          </FormGroup>
          <FormGroup className="radioButtons">
            <Label>
              <Input type="radio" name="radius" value="1610" onChange={(event)=>setRadius(event.target.value)}/>{' '}
              1 mile
            </Label>
          </FormGroup >
          <FormGroup className="radioButtons">
            <Label>
              <Input type="radio" name="radius" value="8047" onChange={(event)=>setRadius(event.target.value)}/>{' '}
              5 miles
            </Label>
          </FormGroup>
          <FormGroup className="radioButtons">
            <Label>
              <Input type="radio" name="radius" value="16100" onChange={(event)=>setRadius(event.target.value)}/>{' '}
              10 miles
            </Label>
          </FormGroup>
          
     
        <div className="buttonImage">
        <Button type="submit" name="kinds" value ="accomodations"  onClick={(event)=>setKinds(event.target.value)}>Accomodations</Button>   
          <Button type="submit" name="kinds" value ="amusements" onClick={(event)=>setKinds(event.target.value)} >Amusements</Button>   
          <Button type="submit" name="kinds" value ="archaeology" onClick={(event)=>setKinds(event.target.value)} >Archaeological Sites</Button>   
          <Button type="submit" name="kinds" value ="architecture" onClick={(event)=>setKinds(event.target.value)} >Architecture</Button>   
          <Button type="submit" name="kinds" value ="beaches" onClick={(event)=>setKinds(event.target.value)} >Beaches</Button>   
          <Button type="submit" name="kinds" value ="casino"  onClick={(event)=>setKinds(event.target.value)}>Casinos</Button>   
          <Button type="submit" name="kinds" value ="burial_places" onClick={(event)=>setKinds(event.target.value)} >Cemeteries/War Memorials</Button>   
          <Button type="submit" name="kinds" value ="urban_environment" onClick={(event)=>setKinds(event.target.value)} >Gardens/Parks</Button>   
          <Button type="submit" name="kinds" value ="fuel" onClick={(event)=>setKinds(event.target.value)} >Gas Stations</Button>   
          <Button type="submit" name="kinds" value ="geological_formations" onClick={(event)=>setKinds(event.target.value)} >Geological Formations</Button>   
          <Button type="submit" name="kinds" value ="historic_architecture" onClick={(event)=>setKinds(event.target.value)} >Historical Landmarks</Button>   
          <Button type="submit" name="kinds" value ="historical_places" onClick={(event)=>setKinds(event.target.value)} >Historical Places</Button>   
          <Button type="submit" name="kinds" value ="alcohol" onClick={(event)=>setKinds(event.target.value)} >Liquor Stores</Button>   
          <Button type="submit" name="kinds" value ="museums" onClick={(event)=>setKinds(event.target.value)} >Museums</Button>   
          <Button type="submit" name="kinds" value ="natural" onClick={(event)=>setKinds(event.target.value)} >Nature</Button>   
          <Button type="submit" name="kinds" value ="religion" onClick={(event)=>setKinds(event.target.value)} >Religious Buildings</Button>   
          <Button type="submit" name="kinds" value ="foods" onClick={(event)=>setKinds(event.target.value)} >Restaurnts</Button>   
          <Button type="submit" name="kinds" value ="shops" onClick={(event)=>setKinds(event.target.value)} >Shopping Outlets</Button>   
          <Button type="submit" name="kinds" value ="sport" onClick={(event)=>setKinds(event.target.value)} >Sporting Activities, Stadiums</Button>   
          <Button type="submit" name="kinds" value ="theatres_and_entertainments" onClick={(event)=>setKinds(event.target.value)} >Theaters</Button>   
          <Button type="submit" name="kinds" value ="transport" onClick={(event)=>setKinds(event.target.value)} >Transportation</Button>   
          </div>
        </Form> 
      </div>
    )
}

export default SearchForm;

