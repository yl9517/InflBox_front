import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/campaign",
});

export const searchCampaigns = async (searchQuery) => {
  try {
    const response = await api.get("/search", {
      params: { search: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
};
