import React, { useState } from "react";
import { List } from "antd";
import LoadingSpinner from "./LoadingSpinner";
import SearchResultItem from "./SearchResultItem";
import { getTodayDate, isValidDate } from "../../utils/utils";

const SearchResults = ({ results, loading }) => {
  const [clickedItems, setClickedItems] = useState(new Set());

  // 클릭 시 호출되는 함수
  const handleItemClick = (item) => {
    setClickedItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(item.linkUrl);
      return newSet;
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={results}
      renderItem={(item) => {
        const applicationEndDate = isValidDate(item.applicationEndAt)
          ? new Date(item.applicationEndAt).toISOString().split("T")[0]
          : "유효하지 않은 날짜";

        const isToday = applicationEndDate === getTodayDate();

        return (
          <SearchResultItem
            item={item}
            applicationEndDate={applicationEndDate}
            isToday={isToday}
            handleItemClick={handleItemClick}
          />
        );
      }}
    />
  );
};

export default SearchResults;
