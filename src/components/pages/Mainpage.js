import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MainPage = () => {
  // const dispatch = useDispatch();
  const houses = useSelector((state) => state.house.houseData);

  // // In this example, we'll use useEffect to simulate fetching data from an API
  // // useEffect(() => {
  // //   // Simulate API call to get house data
  // //   // Replace this with actual API call in your project
  // //   import('../../houseData').then((module) => {
  // //     dispatch(setHouses(module.default));
  // //   });
  // // }, [dispatch]);
  // console.log(houses);
  return (
    <>
      <ul className="main-page">
        {houses.map((house) => (
          <li key={house.id}>
            <img src={house.imageUrl} alt={house.title} />
            {/* Replace the link with React Router Link */}
            <Link to={`/house/${house.id}`}>
              <div className="house-item">
                <div className="house-info">
                  <h3>{house.title}</h3>
                  <p>{house.description}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default MainPage;
