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

  useEffect(() => {
    const handleInitialModalState = () => {
      setIsModalOpen(window.innerWidth > 760);
    };
    handleInitialModalState();
    window.addEventListener('resize', handleInitialModalState);
    return () => {
      window.removeEventListener('resize', handleInitialModalState);
    };
  }, []);

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
        {/* Remove the slide-animation class */}
        <FontAwesomeIcon icon={faBars} onClick={openModal} className='fa-bars'/>
        { isModalOpen && (
          <div>
            <Navigation closeModal={closeModal}/>  
          </div>
        )}
        <ul className="main-page" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
          {houses.map((house) => (
              <li key={house.id}>
              <img className="img-house1" src={house.image_url} alt={house.id} />
              <div className="house-item">
                <div className="house-infos">
                  <h3>  {house.category}</h3>
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
      </div>
      <button type="button" className="arrow left-arrow" onClick={handlePrevSlide}>
        &#10094;
      </button>
      <button type="button" className="arrow right-arrow" onClick={handleNextSlide}>
        &#10095;
      </button>
    </>
  );
};

export default MainPage;
