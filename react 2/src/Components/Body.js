import RestaurantCard from "./RestaurantCard";
import React, { useEffect } from "react";
import { useState } from "react";
import Skeleton from "./Skeleton";
import { Link } from "react-router-dom";
import useOnline from "./Utils/useOnline";
const filterData = function (searchText, restaurants) {
  return restaurants.filter((restaurant) =>
  restaurant?.data?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
  );
};
const Body = function () {

  useEffect(() => {
    const fetchRestaurant = async () => {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6853005&lng=77.257933&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
        setFilterRestaurants(json?.data?.cards[2]?.data?.data?.cards);
      };
      fetchRestaurant();
    }, []);
    
    // to create local variable
    const [searchTxt, setSearchTxt] = useState(""); // to create state variable
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filterRestaurants, setFilterRestaurants] = useState([]);
  const changeHandler = (e) => {
    setSearchTxt(e.target.value);
  };
  const online = useOnline();
  if(!online){
    return <h3>⚠️ You are offline</h3>
  }
  return (
    <>
      <div className="border-2 rounded w-4/5 h-10 m-auto flex items-center">
        <input className="placeholder:text-gray-500 placeholder:text-xs px-4 font-medium h-4 border-0 outline-none"
          placeholder="Search for Restaurant"
          type="text"
          value={searchTxt}
          onChange={changeHandler}
        />
      </div>
      { (filterRestaurants.length === 0 && allRestaurants.length !== 0) && <div className="empty_msg">No restaurant found!</div>}
      {allRestaurants.length === 0 ? (
        <Skeleton />
      ) : (
        <div className="restaurant-list">
          {filterRestaurants.map((restaurant) => {
            return (
              <Link to={`/restaurant/${restaurant?.data?.id}`} key={restaurant?.data?.id}><RestaurantCard {...restaurant.data} /></Link>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Body;
