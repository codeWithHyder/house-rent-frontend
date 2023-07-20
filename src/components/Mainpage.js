import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHouses } from '../redux/actions';

const MainPage = () => {
  const dispatch = useDispatch();
  const houses = useSelector((state) => state.houses);

  // In this example, we'll use useEffect to simulate fetching data from an API
  useEffect(() => {
    // Simulate API call to get house data
    // Replace this with actual API call in your project
    import('../redux/houseData').then((module) => {
      dispatch(setHouses(module.default));
    });
  }, [dispatch]);

  return (
    <>
      <ul className="main-page">
        {houses.map((house) => (
          <li key={house.id}>
            <img src={house.imageUrl} alt={house.title} />
            {/* Replace the link with React Router Link */}
            <a href={`/house/${house.id}`}>
              <div className="house-item">
                <div className="house-info">
                  <h3>{house.title}</h3>
                  <p>{house.description}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default MainPage;
