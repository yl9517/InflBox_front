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
    <div className="w-full max-w-2xl mx-auto p-4">
      <Search
        placeholder="검색어를 입력하세요"
        onSearch={handleSearch}
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        className="search-bar" // 커스텀 클래스를 추가하여 스타일 조정
      />
    </div>
  );
};

export default SearchBar;
