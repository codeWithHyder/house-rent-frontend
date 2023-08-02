/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { BiHomeSmile } from 'react-icons/bi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronRight, faGear } from '@fortawesome/free-solid-svg-icons';
import { setHouses } from '../../Redux/feature/houseSlice';
import Navigation from '../../components/sidebar/Navigation'
import '../../styling/navbar.css'
import '../../styling/detailspage.css'

const HouseDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const detailData = useSelector((state) => state.house.houseData);
  const { id } = useParams();
  const house = detailData.find((house) => house.id === parseInt(id, 10));
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchHousesData = async () => {
      try {
        const response = await fetch('https://house-rent-api.onrender.com/api/v1/houses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        dispatch(setHouses(data));
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching house data:', error);
        setIsLoading(false); 
      }
    };

    fetchHousesData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!house) {
    return <div>House not found</div>;
  }

  const handleReserve = () => {
    // Navigate to ReservePage with the selected house data as state
    navigate(`/reserve/${house.id}`, { state: { house } });
  };

  
  const openModal = () => {
      setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <div className="details-container">
      <div className='menu-back'>
        <FontAwesomeIcon icon={faBars} onClick={openModal} className='fa-bars-details'/>
        <button className="btn-book1" type="button" onClick={() => navigate('/')}>
              <BiHomeSmile />
        </button>
      </div>
      
      { isModalOpen && (
        <div>
          <Navigation closeModal={closeModal}/>  
        </div>
      )}
      <div className="house-detail">  
        <div className="image-section">
          <img className="dis-img" src={house.image_url} alt={house.name} />
        </div>
        <div className="house-info">
          <h3 className="house-dtls detail-title">{house.name}</h3>
          <p className="house-dtls details-desc">{house.description}</p>
          <p className="house-dtls details-rental"><span>Rental Price:</span><span>${house.rental_fee}</span> </p>
          <p className="house-dtls"><span>Type:</span> <span>{house.category}</span> </p>
          <p className="house-dtls details-rental"><span>Location:</span> <span>{house.location}</span></p>
          <p className="house-dtls details-date-built"> <span>Date Built:</span> <span>{house.date_built}</span></p>
          <div className="btn-detail">
            <button className="btn-book2" type="button" onClick={handleReserve}>
              <FontAwesomeIcon icon={faGear} className="fa-gear" style={{ color: 'white' }}/>
              Reserve
              <FontAwesomeIcon icon={faChevronRight} className="faChevronRight"/>
            </button> 
          </div>
        </div>
      </div>

    </div>
    
  );
};

export default HouseDetails;
