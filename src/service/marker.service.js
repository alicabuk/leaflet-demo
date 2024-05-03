import axios from "axios";

const API_URL = "http://localhost:3000/marker";

const markerService = {
  async getAllMarker() {
    try {
      const response = await axios.get(API_URL + "/getallmarker");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data from API");
    }
  },

  async addMarker(data) {
    try {
      const response = await axios.post(API_URL + "/addmarker", data);
      return response.data;
    } catch (error) {
      throw new Error("Add Marker -> Error sending data to API");
    }
  },

  async deleteMarker(id) {
    try {
      const response = await axios.post(API_URL + "/deletemarker", {
        id: id
      });
      return response.data;
    } catch (error) {
      throw new Error("Delete Marker -> Error sending data to API");
    }
  },
};

export default markerService;
