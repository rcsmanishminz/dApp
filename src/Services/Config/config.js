import { fetchData } from '../Api/api';

export const getItemDetailsById = async (itemId) => {
  return fetchData(`getitemdetailsbyid`,itemId);
};
