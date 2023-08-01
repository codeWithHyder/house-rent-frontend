/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';
import { getHouses } from '../../Redux/feature/houseSlice';
import Navigation from '../sidebar/Navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../../styling/mainPage.css';
import '../../styling/navbar.css'

const MainPage = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
      setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const houses = useSelector((store) => store.house.houseData);
  const loading = useSelector((store) => store.house.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHouses());
  }, []);

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  
  const handleNextSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex === houses.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex === 0 ? houses.length - 1 : prevIndex - 1));
  };

  if (loading) {
    return (
      <div className='pacman-loading'>
        <div className="loading-container">
          <PacmanLoader color={'#36D7B7'} css={override} size={25} />
          <h1>Loading...</h1>
        </div>
      </div>
      
    );
  }

  return (
    <>
      <div className="slider-container">
        <FontAwesomeIcon icon={faBars} onClick={openModal} className='fa-bars'/>
        { isModalOpen && (
          <div>
            <Navigation closeModal={closeModal}/>  
          </div>
        )}
        <div className='slide-buttons-houses'>
            <button type="button" className="arrow-left-arrow" onClick={handlePrevSlide} data-testid="prev-arrow">
              &#10094;
            </button>
            <div className='home-title-head'>
              <div className='available-houses'>
                <h2 className="avail-title">Available Houses</h2>
                <h4>Please select a house</h4>
              </div>
              <ul className="main-page" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
                {houses.map((house) => (
                  <li key={house.id} data-testid="listitem">
                    <img className="img-house1" src={house.image_url} alt={house.id} />
                    <div className="house-item">
                      <div className="house-info">
                        <p>  {house.category}</p>
                        <p>{house.description}</p>
                      </div>
                      <Link to={`/house/${house.id}`}>
                        <button className="btn-details" type="button">
                          Details
                        </button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='arrow-container'>
                <button type="button" className="mob-left-arrow" onClick={handlePrevSlide} data-testid="prev-arrow">
                  &#10094;
                </button>

                <button type="button" className="mob-right-arrow" onClick={handleNextSlide} data-testid="nxt-arrow">
                  &#10095;
                </button>

              </div>
            </div>
            
            
          <button type="button" className="arrow-right-arrow" onClick={handleNextSlide} data-testid="nxt-arrow">
            &#10095;
          </button>
        </div>     
      </div>
      
      
    </>
  );
};

export default MainPage;
