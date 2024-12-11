export const getNaverMapUrl = (title) => {
  const cleanedTitle = title.replace(/\[.*?\]\s*/g, "").trim();
  const encodedTitle = encodeURIComponent(cleanedTitle);
  return `https://map.naver.com/v5/search/${encodedTitle}`;
};

export const getTodayDate = () => {
  const today = new Date();
  const kstToday = new Date(today.getTime() + 9 * 60 * 60 * 1000); // UTC 시간에 9시간 추가
  return kstToday.toISOString().split("T")[0];
};

export const isValidDate = (date) => !isNaN(new Date(date).getTime());
