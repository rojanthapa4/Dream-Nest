import { useDispatch, useSelector } from "react-redux";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import { useState, useEffect} from "react";
import setListings from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json()
      dispatch(setListings({listings: data}))
      setLoading(false)

    } catch (error) {
        console.log('Fetch Listings Failed', error.message)
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  console.log(listings)
  return (
    <div className="category-list">
      {categories?.map((category, index) => (
        <div
          className={`category`}
          key={index}
          onClick={() => setSelectedCategory(category.label)}
        >
          <div className="category_icon">{category.icon}</div>
          <p>{category.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Listings;
