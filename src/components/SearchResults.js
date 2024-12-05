import React, { useState } from "react";
import { List, Spin } from "antd";

const SearchResults = ({ results, loading }) => {
  const [clickedItems, setClickedItems] = useState(new Set()); // 클릭된 항목을 관리

  // 클릭 시 호출되는 함수
  const handleItemClick = (item) => {
    setClickedItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(item.linkUrl); // 클릭된 항목의 linkUrl을 추가
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={results}
      renderItem={(item) => {
        const isClicked = clickedItems.has(item.linkUrl); // 클릭된 항목 여부 확인

        return (
          <List.Item
            onClick={() => handleItemClick(item)} // 클릭 시 해당 항목 상태 추가
            className={`cursor-pointer rounded-lg transition-colors ${
              isClicked ? "bg-purple-200 text-purple-600" : "hover:bg-gray-100"
            }`} // 클릭된 항목에 보라색 배경 적용
          >
            <List.Item.Meta
              avatar={
                item.thumbnail && (
                  <div
                    style={{
                      backgroundImage: `url(${item.thumbnail})`, // 배경으로 이미지 설정
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: 128, // 네모 크기
                      height: 128, // 네모 크기
                      borderRadius: "8px", // 둥근 모서리 적용
                    }}
                  />
                )
              }
              title={
                <a
                  href={item.linkUrl}
                  target="_blank" // 새 창으로 열기
                  rel="noopener noreferrer"
                  className={`font-semibold ${
                    isClicked ? "text-purple-600 font-light" : "text-blue-600"
                  }`}
                >
                  {item.title}
                </a>
              }
              description={<span className="text-gray-500">{item.offer}</span>}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default SearchResults;
