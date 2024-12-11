import React from "react";
import { List } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { getNaverMapUrl } from "../../utils/utils";

const SearchResultItem = ({
  item,
  applicationEndDate,
  isToday,
  handleItemClick,
}) => {
  return (
    <List.Item
      onClick={() => handleItemClick(item)}
      className="cursor-pointer rounded-lg transition-colors flex items-center justify-between m-1.5"
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
      <div className="flex items-center gap-4 ml-4">
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

          {item.applicantCount !== undefined && item.capacity !== undefined && (
            <span className="text-xl text-black">
              {item.applicantCount} / {item.capacity}
            </span>
          )}
        </div>

        <div className="flex-grow" />

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
};

export default SearchResultItem;
