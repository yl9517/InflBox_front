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
        response.data && response.data.campaigns ? response.data.campaigns : [];
      setSearchResults(results);
    } catch (error) {
      console.error("검색 실패", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className="app-container" style={{ position: "relative" }}>
        {/* 검색바 컴포넌트 */}
        <div
          className="sticky top-0 z-10 shadow-md"
          style={{
            zIndex: 10,
            position: "sticky",
            top: 0,
            width: "100%",
            backgroundColor: "white",
            padding: "8px", // 검색바 주변에 공간 추가
            marginBottom: "8px", // 검색바와 아래 내용 사이에 여백 추가
            borderRadius: "8px", // 둥근 모서리 추가
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 부드러운 그림자
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 검색 결과 컴포넌트 */}
        <SearchResults results={searchResults} loading={loading} />
      </div>
    </Layout>
  );
};

export default SearchPage;
