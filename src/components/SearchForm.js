import React, { useState, useEffect } from "react";
import { Button, CustomInput, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/SearchForm.css";

/*
    - user enters location
    - location then needs to be entered into getcoord location function to be able to grab longitude & latitude for anotherf fetch

*/

const SearchForm = () => {
  // const [longitude,setLongitude]=useState('');
  // const [latitude,setLatitude]=useState('');
  const [search, setSearch] = useState();
  const [radius, setRadius] = useState();

  const getCoord = (event) => {
    event.preventDefault();
    let key = process.env.REACT_APP_OPENTRIP_API_KEY;
    let url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${search}&apikey=${key}`; //* WORKS?
    console.log(url);
    console.log(key);

    // https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon=-86.15804&lat=39.76838&kinds=stadiums&format=json&apikey=5ae2e3f221c38a28845f05b647f834925ea24e44fb12d1cbd631c42a

    //? below fetch pulls longitude and latitude from the api, to be reused in another fetch function
    fetch(url) //? WORKS
      .then((response) => response.json()) //? WORKS
      .then((data) => {
        //? WORKS
        let longitude = data.lon; //? WORKS
        let latitude = data.lat; //? WORKS

        // let radius =(event) => {

        //       return radio1=true ? 1610
        //       : radio2=true ? 8047
        //       : 16100

        // };

        let url2 = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&format=json&apikey=${key}`;
        console.log(url2);

        fetch(url2)
          .then((response) => response.json())

          .then((data) => {
            console.log(data);
            let museums = data.filter((item) => item.kinds.includes("museums"));
            let historic = data.filter((item) =>
              item.kinds.includes("historic")
            );

            console.log(museums);
            console.log(historic);
            // for (let i=0; i<[].length; i++){
            //   let info=[i].name;
            //   console.log(data)
            // }
          });
      });
  };
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
      <Form onSubmit={(event) => getCoord(event)}>
        <FormGroup>
          <Label>Choose a location:</Label>
          <Input
            type="text"
            name="search"
            onChange={(event) => setSearch(event.target.value)}
            required
            placeholder="Enter a City"
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label>Select a distance radius:</Label>
        </FormGroup>
        <FormGroup className="radioButtons">
          <Label>
            <Input
              type="radio"
              name="radius"
              value="1610"
              onChange={(event) => setRadius(event.target.value)}
            />{" "}
            1 mile
          </Label>
        </FormGroup>
        <FormGroup className="radioButtons">
          <Label>
            <Input
              type="radio"
              name="radius"
              value="8047"
              onChange={(event) => setRadius(event.target.value)}
            />{" "}
            5 miles
          </Label>
        </FormGroup>
        <FormGroup className="radioButtons">
          <Label>
            <Input
              type="radio"
              name="radius"
              value="16100"
              onChange={(event) => setRadius(event.target.value)}
            />{" "}
            10 miles
          </Label>
        </FormGroup>
        <Button type="submit">Click to Search</Button>
      </Form>
      {/* <h2>Testing</h2>
      <Form>
            <FormGroup>
                <Label>Select as many as you would like</Label>
                    <CustomInput type="checkbox">Accomodations</CustomInput>
                    <CustomInput type="checkbox">Amusement Parks</CustomInput>
                    <CustomInput type="checkbox">Architecture</CustomInput>
                    <CustomInput type="checkbox">ATM/Banks</CustomInput>
                    <CustomInput type="checkbox">Beaches</CustomInput>
                    <CustomInput type="checkbox">Entertainment</CustomInput>
                    <CustomInput type="checkbox">Food</CustomInput>
                    <CustomInput type="checkbox">Geological Formations (Canyons, Caves, Rock Formations, etc)</CustomInput>
                    <CustomInput type="checkbox">Glaciers</CustomInput>
                    <CustomInput type="checkbox">Industrial Facilities</CustomInput>
                    <CustomInput type="checkbox">Islands</CustomInput>
                    <CustomInput type="checkbox">Museums</CustomInput>
                    <CustomInput type="checkbox">Natural Springs</CustomInput>
                    <CustomInput type="checkbox">Nature Reserves</CustomInput>
                    <CustomInput type="checkbox">Religious Structures</CustomInput>
                    <CustomInput type="checkbox">Shoping</CustomInput>
                    <CustomInput type="checkbox">Sports</CustomInput>
                    <CustomInput type="checkbox">Transportation</CustomInput>
                    <CustomInput type="checkbox">Urban Parks</CustomInput>
                    <CustomInput type="checkbox">Water (canals, lakes, rivers, waterfalls)</CustomInput>
            </FormGroup>
            <Button type="submit">Click to Search</Button>   
        </Form> */}
      <p></p>
    </div>
  );
};

export default SearchForm;
