import React, { useState, useRef } from "react";
import { searchCampaigns } from "../api/search"; // API 호출 서비스
import SearchBar from "../components/SearchBar"; // 검색바 컴포넌트
import SearchResults from "../components/SearchResults"; // 검색결과 컴포넌트
import { Layout } from "antd";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null); // AbortController 관리

  // 검색어 입력 후 호출되는 함수
  const handleSearch = async (searchQuery) => {
    if (!searchQuery) return;

    // 이전 요청 중단
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController 생성
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    try {
      const response = await searchCampaigns(searchQuery, {
        signal: abortController.signal, // AbortController의 signal 전달
      });

      const results =
        response.data && response.data.campaigns ? response.data.campaigns : [];
      setSearchResults(results);

      // 새로운 검색 시 즉시 맨 위로 스크롤
      window.scrollTo(0, 0);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("이전 요청이 중단되었습니다.");
      } else {
        console.error("검색 실패", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen">
      <div className="relative app-container">
        {/* 검색바 컴포넌트 */}
        <div className="sticky top-0 z-10 bg-white p-2 mb-2 rounded-lg shadow-md">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 검색 결과 컴포넌트 */}
        <SearchResults results={searchResults} loading={loading} />
      </div>
    </Layout>
  );
};

export default SearchPage;
