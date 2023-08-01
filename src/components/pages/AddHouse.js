/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addHouseApi, addHouse } from '../../Redux/feature/houseSlice';
import '../styles/addhouse.css';
import { Link } from 'react-router-dom';

const AddHouse = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rental_fee: '',
    date_built: '',
    category: '',
    image_url: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addHouseApi(formData)).then(() => {
      dispatch(addHouse(formData));
    });
    setFormData({
      name: '',
      location: '',
      rental_fee: '',
      date_built: '',
      category: '',
      image_url: '',
      description: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-house-form-container">
      <h1>Add House</h1>
      <form className="add-house-form" onSubmit={handleSubmit}>
        <label htmlFor="HouseName">
          <input
            name="name"
            type="text"
            placeholder="House Name"
            id="house-name-input"
            data-testid="house-name-input"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Location">
          <input
            name="location"
            type="text"
            placeholder="Location"
            id="house-location"
            data-testid="house-location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Rental_Fee">
          <input
            name="rental_fee"
            type="number"
            placeholder="Rental Fee"
            data-testid="price-input"
            id="price-input"
            value={formData.rental_fee}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Date_Built">
          Date Built:
          <input
            name="date_built"
            type="date"
            placeholder="Date Built"
            id="date-input"
            data-testid="date-input"
            value={formData.date_built}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="Category">
          <input
            name="category"
            type="text"
            placeholder="Category"
            id="category-input"
            data-testid="category-input"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="imageLink">
          <input
            name="image_url"
            type="text"
            placeholder="Image Url"
            id="house-img-url"
            data-testid="house-img-url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            id="description-area"
            data-testid="description-area"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add House</button>
      </form>
    </div>
  );
};

export default AddHouse;
