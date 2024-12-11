import React, { useState } from "react";
import { List, Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

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

  // 네이버 지도 검색 URL 생성 함수
  const getNaverMapUrl = (title) => {
    const cleanedTitle = title.replace(/\[.*?\]\s*/g, "").trim();
    const encodedTitle = encodeURIComponent(cleanedTitle);
    return `https://map.naver.com/v5/search/${encodedTitle}`;
  };

  // 오늘 날짜를 가져오는 함수
  const getTodayDate = () => {
    const today = new Date();
    const kstToday = new Date(today.getTime() + 9 * 60 * 60 * 1000); // UTC 시간에 9시간 추가
    return kstToday.toISOString().split("T")[0];
  };

  // 날짜 유효성 검사 함수
  const isValidDate = (date) => !isNaN(new Date(date).getTime());

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

        const applicationEndDate = isValidDate(item.applicationEndAt)
          ? new Date(item.applicationEndAt).toISOString().split("T")[0]
          : "유효하지 않은 날짜";

        const isToday = applicationEndDate === getTodayDate();

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
              margin: "5px 20px",
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl !text-purple-600 font-semibold"
                  style={{ fontSize: "20px" }}
                >
                  {item.title}
                </a>
              }
              description={
                <div>
                  <span className="text-gray-500">{item.offer}</span>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#E8F6E8",
                        color: "#2ECC71",
                        marginTop: "10px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                      }}
                    >
                      {item.platform || "Blog"}
                    </span>
                    <span
                      style={{
                        backgroundColor: "#FFF4E6",
                        color: "#FF8C00",
                        marginTop: "10px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                      }}
                    >
                      {item.type || "방문"}
                    </span>
                    {item.category && (
                      <span
                        style={{
                          backgroundColor: "#EAF2FF",
                          color: "#007BFF",
                          marginTop: "10px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "10px",
                        }}
                      >
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              }
            />

            {/* 오른쪽 콘텐츠 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginLeft: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                {item.applicationEndAt && (
                  <span
                    style={{
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: isToday ? "red" : "black",
                    }}
                  >
                    {applicationEndDate}
                  </span>
                )}
                {item.applicantCount !== undefined &&
                  item.capacity !== undefined && (
                    <span className="text-xl text-gray-400">
                      {item.applicantCount} / {item.capacity}
                    </span>
                  )}
              </div>

              <div style={{ flexGrow: 1 }} />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(getNaverMapUrl(item.title), "_blank");
                }}
              >
                <EnvironmentOutlined
                  style={{
                    fontSize: "24px",
                    color: "#1EC800",
                  }}
                />
              </div>
            </div>
          </List.Item>
        );
      }}
    />
  );
};

export default SearchResults;
