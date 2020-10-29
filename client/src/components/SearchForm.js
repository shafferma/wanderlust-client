import React, {useState, useEffect} from 'react';
import {Button, CustomInput, Form, FormGroup, Label} from 'reactstrap';

const SearchForm = (props) =>{
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
        </Form>
    )
    
}


export default SearchForm;