import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const houses = useSelector((state) => state.house.houseData);

  const [sliderIndex, setSliderIndex] = useState(0);

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
              <img className="img-house1" src={house.imageUrl} alt={house.title} />
              <div className="house-item">
                <div className="house-info">
                  <p>{house.title}</p>
                  {/* <p>{house.description}</p> */}
                </div>
                <Link to={`/house/${house.id}`}>
                  <button className="btn-details" type="button">
                    Details
                  </button>
                </Link>
              </div>
              {/* <button className="btn-details" type="button">Details</button> */}
            </li>
            // </Link>
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

// export default MainPage;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const MainPage = () => {
//   // const dispatch = useDispatch();
//   const houses = useSelector((state) => state.house.houseData);

//   // // In this example, we'll use useEffect to simulate fetching data from an API
//   // // useEffect(() => {
//   // //   // Simulate API call to get house data
//   // //   // Replace this with actual API call in your project
//   // //   import('../../houseData').then((module) => {
//   // //     dispatch(setHouses(module.default));
//   // //   });
//   // // }, [dispatch]);
//   // console.log(houses);
//   return (
//     <>
//       <ul className="main-page">
//         {houses.map((house) => (
//           <li key={house.id}>
//             <img className="img-house1" src={house.imageUrl} alt={house.title} />
//             {/* Replace the link with React Router Link */}
//             <Link to={`/house/${house.id}`}>
//               <div className="house-item">
//                 <div className="house-info">
//                   <p>{house.title}</p>
//                   <p>{house.description}</p>
//                 </div>
//               </div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };
// export default MainPage;
