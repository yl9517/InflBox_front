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
        const isClicked = clickedItems.has(item.linkUrl);

        return (
          <List.Item
            onClick={() => handleItemClick(item)}
            className={`cursor-pointer rounded-lg transition-colors ${
              isClicked ? "bg-purple-200 text-purple-600" : "hover:bg-gray-100"
            }`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* 왼쪽 콘텐츠 */}
            <List.Item.Meta
              avatar={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.siteLogo && (
                    <img
                      src={item.siteLogo}
                      alt="Site Logo"
                      style={{
                        width: 50,
                        padding: 10,
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {item.thumbnail && (
                    <div
                      style={{
                        backgroundImage: `url(${item.thumbnail})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: 128,
                        height: 128,
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </div>
              }
              title={
                <a
                  href={item.linkUrl}
                  target="_blank" // 새 창으로 열기
                  rel="noopener noreferrer"
                  className="text-4xl !text-purple-600 font-semibold"
                  style={{ fontSize: "20px" }}
                >
                  {item.title}
                </a>
              }
              description={<span className="text-gray-500">{item.offer}</span>}
            />

            {/* 오른쪽 콘텐츠 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginRight: "20px",
              }}
            >
              {item.winnerAnnouncementAt && (
                <span style={{ marginBottom: "8px", fontWeight: "bold" }}>
                  {
                    new Date(item.winnerAnnouncementAt)
                      .toISOString()
                      .split("T")[0]
                  }
                </span>
              )}
              {/* applicantCount / capacity */}
              {item.applicantCount !== undefined &&
                item.capacity !== undefined && (
                  <span className="text-sm text-gray-400">
                    {item.applicantCount} / {item.capacity}
                  </span>
                )}
            </div>
          </List.Item>
        );
      }}
    />
  );
};

export default SearchResults;
