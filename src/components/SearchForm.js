import React, { useState, useEffect } from "react";
import {
  Button,
  CustomInput,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "../styles/SearchForm.css";

const SearchForm = (props) => {
  const [search, setSearch] = useState();
  const [radius, setRadius] = useState();
  const [kinds, setKinds] = useState();
  const [description, setDescription] = useState();
  const [favResults, setFavorites] = useState([]);

  /* Start*/
  const [moreName, setMoreName] = useState();
  const [moreImg, setMoreImg] = useState();
  const [moreText, setMoreText] = useState();
  const [moreAddress, setMoreAddress] = useState();
  const [openTripMap, setOpenTripMap] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  /* End*/

  const [data, setData] = useState();

  const getCoord = (event) => {
    event.preventDefault();
    let key = process.env.REACT_APP_OPENTRIP_API_KEY;
    let url = `https://api.opentripmap.com/0.1/en/places/geoname?name=${search}&apikey=${key}`; //* WORKS?
    // console.log(url)

    //? below fetch pulls longitude and latitude from the api, to be reused in another fetch function
    fetch(url) //? WORKS
      .then((response) => response.json()) //? WORKS
      .then((data) => {
        //? WORKS
        let longitude = data.lon; //? WORKS
        let latitude = data.lat; //? WORKS

        let url2 = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${longitude}&lat=${latitude}&kinds=${kinds}&format=json&limit=25&apikey=${key}`;
        // console.log(url2);

        fetch(url2)
          .then((response) => response.json())
          .then((data) => setData(data));
      });
    console.log(data);
  };

  const displayResults = () => {
    console.log(data);
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.name}</td>
          <Button id="xidFetch" onClick={(e) => moreInfo(item.xid)}>
            More Info
          </Button>
          <Button id="favItem" onClick={(e) => addFavorite(item.name)}>
            Heart
          </Button>
        </tr>
      );
    });
  };

  function moreInfo(xid) {
    let key = process.env.REACT_APP_OPENTRIP_API_KEY;
    let xidURL =
      "https://api.opentripmap.com/0.1/en/places/xid/" + xid + "?apikey=" + key;

    fetch(xidURL)
      .then((response) => response.json())
      .then((finalData) => {
        console.log(finalData);
        setMoreName(finalData.name);
        // setMoreImg(finalData.preview.source);
        setMoreImg(
          finalData.preview == null ? <p>TEST</p> : finalData.preview.source
        );
        setMoreText(
          finalData.wikipedia_extracts == null ? (
            <p> No description available</p>
          ) : (
            finalData.wikipedia_extracts.text
          )
        );

        // setMoreText(finalData.wikipedia_extracts.text);
        setOpenTripMap(finalData.otm);
        setMoreAddress(
          `${finalData.address.house_number} ${finalData.address.road}`
        );
        setModalOpen(true);
      });
  }

  const toggleModal = (e) => {
    setModalOpen(false);
  };

  function addFavorite(value) {
    console.log("value", value);
    setFavorites(favResults.concat(value));
  }
  console.log(favResults);

  const createTrip = (event) => {
    event.preventDefault();
    fetch("https://wanderlust-travel-hhsk.herokuapp.com/trips/new", {
      method: "POST",
      body: JSON.stringify({
        trip: {
          location: search,
          description: description,
          sites: JSON.stringify(favResults),
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <Form onSubmit={(event) => getCoord(event)}>
        <div id="locationInput">
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
        </div>

        <div className="buttonImage">
          <Button
            id="accomodations"
            type="submit"
            name="kinds"
            value="accomodations"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Accomodations</p>
          </Button>
          <Button
            id="amusements"
            type="submit"
            name="kinds"
            value="amusements"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Amusements</p>
          </Button>
          <Button
            id="archaeology"
            type="submit"
            name="kinds"
            value="archaeology"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Archaeological Sites</p>
          </Button>
          <Button
            id="architecture"
            type="submit"
            name="kinds"
            value="architecture"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Architecture</p>
          </Button>
          <Button
            id="beaches"
            type="submit"
            name="kinds"
            value="beaches"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Beaches</p>
          </Button>
          <Button
            id="casino"
            type="submit"
            name="kinds"
            value="casino"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Casinos</p>
          </Button>
          <Button
            id="memorials"
            type="submit"
            name="kinds"
            value="burial_places"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Cemeteries/ Memorials</p>
          </Button>
          <Button
            id="parks"
            type="submit"
            name="kinds"
            value="urban_environment"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Parks</p>
          </Button>
          {/* <Button type="submit" name="kinds" value ="fuel" onClick={(event)=>setKinds(event.target.value)} >Gas Stations</Button>    */}
          <Button
            id="geology"
            type="submit"
            name="kinds"
            value="geological_formations"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Geological Formations</p>
          </Button>
          <Button
            id="landmarks"
            type="submit"
            name="kinds"
            value="historic_architecture"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Historical Landmarks</p>
          </Button>
          <Button
            id="historicalPlaces"
            type="submit"
            name="kinds"
            value="historical_places"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Historical Places</p>
          </Button>
          {/* <Button type="submit" name="kinds" value ="alcohol" onClick={(event)=>setKinds(event.target.value)} >Liquor Stores</Button>    */}
          <Button
            id="museum"
            type="submit"
            name="kinds"
            value="museums"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Museums</p>
          </Button>
          <Button
            id="nature"
            type="submit"
            name="kinds"
            value="natural"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Nature</p>
          </Button>
          <Button
            id="religious"
            type="submit"
            name="kinds"
            value="religion"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Religious Buildings</p>
          </Button>
          <Button
            id="restaurant"
            type="submit"
            name="kinds"
            value="foods"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Restaurants</p>
          </Button>
          <Button
            id="shopping"
            type="submit"
            name="kinds"
            value="shops"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Shopping</p>
          </Button>
          <Button
            id="sports"
            type="submit"
            name="kinds"
            value="sport"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Sports</p>
          </Button>
          <Button
            id="theater"
            type="submit"
            name="kinds"
            value="theatres_and_entertainments"
            onClick={(event) => setKinds(event.target.value)}
          >
            <p>Theaters</p>
          </Button>
          {/* <Button type="submit" name="kinds" value ="transport" onClick={(event)=>setKinds(event.target.value)} >Transportation</Button>    */}
        </div>
      </Form>
      <div>
        <Modal isOpen={modalOpen}>
          <ModalHeader>{moreName}</ModalHeader>
          <Button onClick={toggleModal}>X</Button>
          <ModalBody>
            <p>
              <b>{moreAddress}</b>
            </p>
            <img src={`${moreImg}`} alt="" />
            <p>{moreText}</p>
            <p>
              <a target="_blank" href={openTripMap}>
                See location at OpenTripMap
              </a>
            </p>
          </ModalBody>
        </Modal>
        <tbody>{data ? displayResults() : <></>}</tbody>
        <Form onSubmit={createTrip}>
          <FormGroup>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Trip description (ex. Anniversary)"
            ></Input>
            <Button type="submit">Create Trip</Button>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default SearchForm;
