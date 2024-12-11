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

  const handleLogoClick = () => {
    window.location.href = "/home";
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
        src="/EggReview.png"
        alt="Logo"
        style={{
          width: "100px",
          marginRight: "5px",
          transition: "transform 0.3s ease",
          cursor: "pointer",
        }}
        onClick={handleLogoClick}
        onMouseEnter={(e) => (e.target.src = "/EggReview2.png")}
        onMouseLeave={(e) => (e.target.src = "/EggReview.png")}
      />
      <Search
        placeholder="검색어를 입력하세요"
        onSearch={handleSearch}
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        className="search-bar"
        style={{ flex: 1 }}
      />
    </div>
  );
};

export default SearchBar;
