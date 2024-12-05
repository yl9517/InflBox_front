import React, { useState } from "react";
import { searchCampaigns } from "../api/search"; // API 호출 서비스
import SearchBar from "../components/SearchBar"; // 검색바 컴포넌트
import SearchResults from "../components/SearchResults"; // 검색결과 컴포넌트
import { Layout } from "antd";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 검색어 입력 후 호출되는 함수
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await searchCampaigns(searchQuery); // API 호출

      const results =
        response.data && response.data.campaings ? response.data.campaings : [];
      setSearchResults(results);
    } catch (error) {
      console.error("검색 실패", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="app-container">
        {/* 검색바 컴포넌트 */}
        <SearchBar onSearch={handleSearch} />

        {/* 검색 결과 컴포넌트 */}
        <SearchResults results={searchResults} loading={loading} />
      </div>
    </Layout>
  );
};

export default SearchPage;
