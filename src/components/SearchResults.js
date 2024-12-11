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
            className={`cursor-pointer rounded-lg transition-colors flex items-center justify-between m-1.5`}
          >
            {/* 왼쪽 콘텐츠 */}
            <List.Item.Meta
              avatar={
                <div className="flex items-center">
                  {item.siteLogo && (
                    <img
                      src={item.siteLogo}
                      alt="Site Logo"
                      className="w-12 p-2 object-cover"
                    />
                  )}
                  {item.thumbnail && (
                    <div
                      className="bg-cover bg-center w-32 h-32 rounded-lg"
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    />
                  )}
                </div>
              }
              title={
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl font-semibold"
                  style={{ fontSize: "20px" }}
                >
                  {item.title}
                </a>
              }
              description={
                <div>
                  <span className="text-gray-500">{item.offer}</span>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-[#E8F6E8] text-[#2ECC71] mt-2 px-2 py-1 rounded text-xxs">
                      {item.platform || "Blog"}
                    </span>
                    <span className="bg-[#FFF4E6] text-[#FF8C00] mt-2 px-2 py-1 rounded text-xxs">
                      {item.type || "방문"}
                    </span>
                    {item.category && (
                      <span className="bg-[#EAF2FF] text-[#007BFF] mt-2 px-2 py-1 rounded text-xxs">
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
              <div className="flex flex-col items-center text-center text-lg">
                {item.applicationEndAt && (
                  <span
                    className={`mb-2 font-bold ${
                      isToday ? "text-red-500" : "text-black"
                    }`}
                  >
                    {applicationEndDate}
                  </span>
                )}

                {item.applicantCount !== undefined &&
                  item.capacity !== undefined && (
                    <span className="text-xl text-black">
                      {item.applicantCount} / {item.capacity}
                    </span>
                  )}
              </div>

              <div style={{ flexGrow: 1 }} />

              <div
                className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer mr-4"
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
