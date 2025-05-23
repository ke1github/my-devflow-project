import { JobFilterParams } from '@/types/action';

//
export const fetchLocations = async () => {
  // Fetch data from the IP-API to get the user's location based on their IP address
  const response = await fetch('http://ip-api.com/json/?fields=country');

  const location = await response.json();

  return location.country;
};

export const fetchCountries = async () => {
  try {
    // Fetch data from the REST Countries API to get a list of countries
    const response = await fetch('https://restcountries.com/v3.1/all');
    // Check if the response is ok (status in the range 200-299)
    const result = await response.json();

    // Map the result to extract the name and code of each country
    return result;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  // Define headers for the API request
  const headers = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY ?? '',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  };

  // Fetch data from the API using the provided query and page
  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
    {
      headers,
    },
  );
  const result = await response.json();
  return result.data;
};
