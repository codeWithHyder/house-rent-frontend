import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [houses, setHouses] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchHousesData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/houses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        // console.error('Error fetching house data:', error);
      }
    };

    fetchHousesData(); // Call the function to fetch data
  }, []);

  const handleNextSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex === houses.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevSlide = () => {
    setSliderIndex((prevIndex) => (prevIndex === 0 ? houses.length - 1 : prevIndex - 1));
  };

  return (
    <>
      <div className="slider-container">
        {/* Remove the slide-animation class */}
        <ul className="main-page" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
          {houses.map((house) => (
            // <Link to={`/house/${house.id}`} key={house.id} className="house-link">
            <li key={house.id}>
              <img className="img-house1" src={house.image_url} alt={house.id} />
              <div className="house-item">
                <div className="house-info">
                  <p>{house.type}</p>
                  <p>{house.name}</p>
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
