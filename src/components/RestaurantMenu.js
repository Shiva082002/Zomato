import { useParams } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import { RestaurantMenuShimmer } from "./Shimmer";
import useDataById from "./DataById";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const { resId } = useParams(); // Get resId from URL parameters
  const { data: restaurantInfo, loading, error } = useDataById(resId); // Fetch data using the hook

  if (loading) {
    return <RestaurantMenuShimmer />; // Display shimmer if data is loading
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if data fetching fails
  }

  if (!restaurantInfo) {
    return <div>No restaurant data available</div>; // Handle empty data scenario
  }

  const {
    name,
    cuisines,
    locality_verbose: locality,
    address,
    average_cost_for_two,
    has_table_booking,
    has_online_delivery,
    user_rating: { aggregate_rating: avgRatingString, votes: totalRatingsString },
    featured_image,
    zomato_events,
  } = restaurantInfo;

  return (
    <div className="menu">
      <div className="restaurant-header">
        <div className="restaurant-header-details">
          {/* Restaurant Name, Locality, and Address */}
          <h1>{name}</h1>
          <h3>{locality}</h3>
          <p>{address}</p>
          <p>{cuisines}</p>

          {/* Rating and Average Cost */}
          <h4 className="rating-time">
            <div className="rating">
              <MdStarRate
                className="rating-logo"
                style={{
                  backgroundColor: avgRatingString >= 4.0 ? "var(--green)" : "var(--red)",
                }}
              />
              <span>
                {avgRatingString || "N/A"} ({totalRatingsString || "1K+ ratings"})
              </span>
            </div>
            <span>|</span>
            <span className="time">Average cost for two: ₹{average_cost_for_two}</span>
          </h4>

          {/* Booking and Delivery Info */}
          <p>
            {has_table_booking ? "Table booking available" : "No table booking"}
            &nbsp;|&nbsp;
            {has_online_delivery ? "Online delivery available" : "No online delivery"}
          </p>

          {/* Featured Image */}
          {featured_image && (
            <div className="restaurant-image">
              <img src={featured_image} alt={`${name} featured`} />
            </div>
          )}
        </div>
      </div>

      {/* Zomato Events Section */}
      {zomato_events && zomato_events.length > 0 ? (
  <div className="events-section">
    <h2>Upcoming Events</h2>
    {zomato_events.map((event, index) => (
      <div key={index} className="event-card">
        {/* Event details on the left */}
        <div className="event-info">
          <h3 className="event-title">{event['event'].title}</h3>
          <p className="event-description">{event['event'].description}</p>
          <p className="event-timing">
            <strong>Date:</strong> {event['event'].display_date} | <strong>Time:</strong> {event['event'].display_time}
          </p>
        </div>

        {/* Event image on the right */}
        {event['event'].photos && event['event'].photos.length > 0 && (
          <div className="event-image">
            <img
              src={event['event'].photos[0].photo.thumb_url}
              alt={`Event ${event['event'].title}`}
            />
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <div className="no-events">
    <h2>No Upcoming Events</h2>
    <p>There are no upcoming events scheduled at the moment. Please check back later for updates.</p>
  </div>
)}
    </div>
  );
};

export default RestaurantMenu;
