import { Link } from "react-router-dom";
import { MdStarRate } from "react-icons/md";

const RestaurantCard = ({
  id,
  name,
  city,
  votes,
  cuisines,
  costForTwo,
  avgRatingString,
  imageUrl,
}) => {
  return (
    <Link to={`/restaurants/${id}`} className="restaurant-card">
      <div className="restaurant-image">
        <img src={imageUrl || "https://via.placeholder.com/150"} alt={name} /> 
      </div>
      <div className="restaurant-details">
        <h3 className="restaurant-name">
          {name.length > 24 ? name.slice(0, 21) + "..." : name.slice(0, 24)}
        </h3>
        <div className="esa-rating">
          <h4 className="rating">
            <MdStarRate
              className="rating-logo"
              style={
                avgRatingString > 4.0
                  ? { backgroundColor: "var(--green)" }
                  : { backgroundColor: "var(--red)" }
              }
            />
            <span>{avgRatingString}</span>
          </h4>
          <h4>₹{costForTwo}</h4>
          <h4>{votes} Votes</h4>
        </div>
        <p className="cuisine">
          {cuisines.length > 32
            ? cuisines.slice(0, 28) + "..."
            : cuisines}
        </p>
        <p className="location">{city}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
