import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  const handleSearch = (value) => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* 로고를 검색바 왼쪽에 위치시키고, 한 줄에 배치 */}
      <img
        src="/EggReview.png" // 기본 이미지
        alt="Logo"
        style={{
          width: "80px", // 로고 크기 조정
          marginRight: "10px", // 로고와 검색창 간의 간격
          transition: "transform 0.3s ease", // 부드러운 효과를 위해 transition 추가
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.target.src = "/EggReview2.png")} // 마우스가 올라갔을 때 이미지 변경
        onMouseLeave={(e) => (e.target.src = "/EggReview.png")} // 마우스가 떠날 때 원래 이미지로 복구
      />
      <Search
        placeholder="검색어를 입력하세요"
        onSearch={handleSearch}
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        className="search-bar"
        style={{ flex: 1 }} // 검색창이 나머지 공간을 차지하도록 설정
      />
    </div>
  );
};

export default SearchBar;
