import React, { useState } from "react";
import { List, Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons"; // 네이버 지도 아이콘 대체

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

  // 네이버 지도 검색 URL 생성 함수
  const getNaverMapUrl = (title) => {
    const cleanedTitle = title.replace(/\[.*?\]\s*/g, "").trim(); // 대괄호 내용 제거
    const encodedTitle = encodeURIComponent(cleanedTitle); // 검색어 인코딩
    return `https://map.naver.com/v5/search/${encodedTitle}`;
  };

  // 오늘 날짜를 가져오는 함수
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
        const isToday =
          item.winnerAnnouncementAt &&
          new Date(item.winnerAnnouncementAt).toISOString().split("T")[0] ===
            getTodayDate(); // 오늘인지 확인

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
              margin: "20px",
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
                alignItems: "center",
                gap: "16px", // 요소 간 간격
              }}
            >
              {/* 날짜 및 지원자 정보 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                {/* winnerAnnouncementAt 날짜 */}
                {item.winnerAnnouncementAt && (
                  <span
                    style={{
                      marginBottom: "8px",
                      fontWeight: "bold",
                      color: isToday ? "red" : "black", // 오늘 날짜는 빨간색
                    }}
                  >
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
                    <span className="text-xl text-gray-400">
                      {item.applicantCount} / {item.capacity}
                    </span>
                  )}
              </div>

              {/* 오른쪽 여백 */}
              <div style={{ flexGrow: 1 }} />

              {/* 네이버 지도 아이콘 */}
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
                  e.stopPropagation(); // 부모 클릭 이벤트 방지
                  window.open(getNaverMapUrl(item.title), "_blank");
                }}
              >
                <EnvironmentOutlined
                  style={{
                    fontSize: "24px",
                    color: "#2db7f5",
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
