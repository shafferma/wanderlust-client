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
import { useToasts } from "react-toast-notifications";

const CATEGORIES = [
  {
    value: "accomodations",
    label: "Accomodations",
  },
  {
    value: "amusements",
    label: "Amusements",
  },
  {
    value: "archaeology",
    label: "Archaeological Sites",
  },
  {
    value: "architecture",
    label: "Architecture",
  },
  {
    value: "beaches",
    label: "Beaches",
  },
  {
    value: "casino",
    label: "Casinos",
  },
  {
    value: "burial_places",
    label: "Cemeteries/ Memorials",
  },
  {
    value: "urban_environment",
    label: "Parks",
  },
  {
    value: "geological_formations",
    label: "Geological Formations",
  },
  {
    value: "historic_architecture",
    label: "Historical Landmarks",
  },
  {
    value: "historical_places",
    label: "Historical Places",
  },
  {
    value: "museums",
    label: "Museums",
  },
  {
    value: "natural",
    label: "Nature",
  },
  {
    value: "religion",
    label: "Religious Buildings",
  },
  {
    value: "foods",
    label: "Restaurants",
  },
  {
    value: "shops",
    label: "Shopping",
  },
  {
    value: "sport",
    label: "Sports",
  },
  {
    value: "theatres_and_entertainments",
    label: "Theaters",
  },
];

const SearchForm = (props) => {
  const [search, setSearch] = useState();
  const [radius, setRadius] = useState();
  const [kinds, setKinds] = useState();
  const [description, setDescription] = useState();
  const [favResults, setFavorites] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  /* Start*/
  const [moreName, setMoreName] = useState();
  const [moreImg, setMoreImg] = useState();
  const [moreText, setMoreText] = useState();
  const [moreAddress, setMoreAddress] = useState();
  const [openTripMap, setOpenTripMap] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  /* End*/

  const [data, setData] = useState();

  const { addToast } = useToasts();
  // useEffect(() => {
  //   addToast("Saved Successfully", { appearance: "success" });
  // }, []);

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
          <Button id="favItem" onClick={(e) => addFavorite(item.name)}></Button>
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
        setMoreName(finalData.name);
        setMoreText(
          finalData.wikipedia_extracts == null ? (
            <p> No description available</p>
          ) : (
            finalData.wikipedia_extracts.text
          )
        );

        setMoreImg(
          finalData.preview == null ? (
            <p>No photo available</p>
          ) : (
            finalData.preview.source
          )
        );
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

  const createTrip = (event) => {
    event.preventDefault();

    if (!props.token) {
      setShowRegisterModal(true);
      return;
    }

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
        addToast("Saved Successfully", { appearance: "success" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createCategoryButtons = () => {
    return CATEGORIES.map((c, index) => (
      <Button
        key={index}
        id={c.value}
        type="submit"
        name="kinds"
        onClick={() => setKinds(c.value)}
      >
        <p>{c.label}</p>
      </Button>
    ));
  };

  return (
    <div id="searchform">
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
              <Label id="distanceRadius">Select a distance radius:</Label>
            </FormGroup>
            <div className="radioGroup">
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
          </div>

          <div className="buttonImage">{createCategoryButtons()}</div>
        </Form>
        <div>
          <Modal isOpen={modalOpen}>
            <ModalHeader>
              <span>{moreName}</span>
              <Button onClick={toggleModal}>X</Button>
            </ModalHeader>
            <ModalBody>
              <p>
                <b>{moreAddress}</b>
              </p>
              <img src={`${moreImg}`} alt="No Photo Available" />
              <p>{moreText}</p>
              <p>
                <a target="_blank" href={openTripMap}>
                  See location at OpenTripMap
                </a>
              </p>
            </ModalBody>
          </Modal>
          <Modal isOpen={showRegisterModal}>
            <ModalHeader>
              <span>Register</span>
              <Button onClick={() => setShowRegisterModal(false)}>X</Button>
            </ModalHeader>
            <ModalBody>
              <p>Please register or login to create a trip.</p>
            </ModalBody>
          </Modal>
          {/* 

          A tbody cannot live inside of a <div> container... 
          it must live inside of a <table> 
          ... be sure to define a <thead> with columns
        */}
          <table>
            <tbody>{data?.length ? displayResults() : <></>}</tbody>
          </table>
          <div className="tripCreate">
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
      </div>
    </div>
  );
};

export default SearchForm;
