import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const searchCampaigns = async (searchQuery) => {
  try {
    const response = await api.get("/campaign/search", {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
