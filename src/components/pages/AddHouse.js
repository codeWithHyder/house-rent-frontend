/* eslint-disable */
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { addHouse } from '../../Redux/feature/addHouseSlice';
import '../styles/addhouse.css';
import { useState } from 'react';

const AddHouse = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the addHouse action with the form data
    dispatch(
      addHouse({
        HouseName: formData.HouseName,
        Location: formData.Location,
        Rental_Fee: formData.Rental_Fee,
        Date_Built: formData.Date_Built,
        Category: formData.Category,
        imageLink: formData.imageLink,
        description: formData.description,
      })
    );

    // After the dispatch is complete, you can redirect or show a success message.
    // Example: history.push('/houses') for redirecting to the houses page.
  };

  return (
    <div className="add-house-form-container">
    <h1>Add House</h1>
    <form className="add-house-form">
      <label htmlFor="HouseName">
        
        <input type="text" placeholder="House Name" id="house-name-input" />
      </label>
      <label htmlFor="Location">
        
        <input type="text" placeholder="Location" id="house-location" />
      </label>
      <label htmlFor="Rental_Fee">
        
        <input type="number" placeholder="Rental Fee" id="price-input" />
      </label>
      <label htmlFor="Date_Built">
        Date Built:
        <input type="date" placeholder="Date Built" id="date-input" />
      </label>
      <label htmlFor="Category">
        
        <input type="text" placeholder="Category" id="category-input" />
      </label>
      <label htmlFor="imageLink">
        
        <input type="text" placeholder="Image Url" id="house-img-url" />
      </label>
      <label htmlFor="description">
        
        <textarea type="text" placeholder="Description" id="description-area" />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  </div>
  )
  
};

export default AddHouse;
