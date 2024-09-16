import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { RestaurantShimmer } from "./Shimmer";
import "./Body.css";
import usePaginatedData from "./DataList";
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Box, Typography, Button } from '@mui/material';
import useDebounce from "./Debounce";
import { countryOptions, avgSpendOptions, cuisinesOptions } from "./Variables";
import useImageUploader from "./ImageSearch"; // Import the custom hook
import {menu_item_map} from './Variables';


const Body = () => {
  const { data, page, total_pages, pageSize, loading, error, setPage, setPageSize, setFilter } = usePaginatedData();
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [avgSpendFilter, setAvgSpendFilter] = useState("");
  const [cuisinesFilter, setCuisinesFilter] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [radius, setRadius] = useState(3);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSubmit, setFileSubmit] = useState(false);
  const { prediction, uploadImage } = useImageUploader();

  const debouncedSearch = useDebounce(searchRestaurant, 500);

  // Update filter when any of the filter criteria changes
  useEffect(() => {
    setRestaurantName(debouncedSearch);
    setFilter({
      name: debouncedSearch,
      country: countryFilter,
      avgSpend: avgSpendFilter,
      cuisines: cuisinesFilter,
      longitude,
      latitude,
      radius
    });
  }, [debouncedSearch, countryFilter, avgSpendFilter, cuisinesFilter, longitude, latitude, radius, setFilter]);


  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (fileSubmit) {
      uploadImage(selectedFile);
      setFileSubmit(false);
    }
  }, [fileSubmit, selectedFile, uploadImage]);


  useEffect(() => {
    if (prediction) {
      const mappedPrediction = Object.keys(menu_item_map).find(key => 
        menu_item_map[key].includes(prediction)
      );
    
      if (mappedPrediction) {
        setCuisinesFilter(mappedPrediction);
      }
    }}, [prediction]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setFileSubmit(true);
  };

  return (
    <div className="body">
      <Box sx={{ padding: 2, mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Search Bar */}
        <TextField
          type="text"
          value={searchRestaurant}
          onChange={(e) => setSearchRestaurant(e.target.value)}
          placeholder="Search for a restaurant..."
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />

        {/* Filter Box */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6" sx={{ flexBasis: '100%' }}>Filter Options</Typography>

          <FormControl variant="outlined" size="small" sx={{ flex: 1 }}>
            <InputLabel htmlFor="country-filter">Country</InputLabel>
            <Select
              id="country-filter"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              label="Country"
            >
              {countryOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" sx={{ flex: 1 }}>
            <InputLabel htmlFor="avg-spend-filter">Average Spend</InputLabel>
            <Select
              id="avg-spend-filter"
              value={avgSpendFilter}
              onChange={(e) => setAvgSpendFilter(e.target.value)}
              label="Average Spend"
            >
              {avgSpendOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" sx={{ flex: 1 }}>
            <InputLabel htmlFor="cuisines-filter">Cuisines</InputLabel>
            <Select
              id="cuisines-filter"
              value={cuisinesFilter}
              onChange={(e) => setCuisinesFilter(e.target.value)}
              label="Cuisines"
            >
              {cuisinesOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="text"
            label="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            label="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <TextField
            type="text"
            label="Radius (km)"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            variant="outlined"
            sx={{ flex: 1 }}
          />

          {/* Image Upload Section */}
          <Box sx={{ flexBasis: '100%', mt: 2 }}>
            <Typography variant="h6">Upload Image to Search on the basis of Cuisines</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'block' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Upload Image
              </Button>
            </form>
          </Box>
        </Box>
      </Box>

      {loading ? (
        <div className="loading-container">
          <RestaurantShimmer />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : data.length === 0 ? (
        <h2>Sorry, we couldn't find any restaurant for "{restaurantName}"</h2>
      ) : (
        <div className="restaurant-container">
          {data.map((restaurant) => (
            <RestaurantCard
              key={restaurant['R']['res_id']}
              id={restaurant['R']['res_id']}
              name={restaurant['name']}
              areaName={restaurant['location.city']}
              votes={restaurant['user_rating']['votes']}
              cuisines={restaurant['cuisines']}
              costForTwo={restaurant['average_cost_for_two']}
              avgRatingString={restaurant['user_rating']['aggregate_rating']}
              imageUrl={restaurant['featured_image']}
            />
          ))}
        </div>
      )}

      <div className="pagination-container">
        <div className="pagination-buttons">
          <Pagination
            count={total_pages}
            page={page}
            onChange={(e, value) => setPage(value)}
            showFirstButton
            showLastButton
            boundaryCount={2}
          />
        </div>
        <div className="page-size-selector">
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="page-size">Items per page</InputLabel>
            <Select
              id="page-size"
              value={pageSize}
              onChange={handlePageSizeChange}
              label="Items per page"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Body;
