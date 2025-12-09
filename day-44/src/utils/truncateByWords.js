export default function (str = "", numWords = 10) {
  // Trim tránh chuỗi có nhiều khoảng trắng
  const words = str.trim().split(/\s+/);

  if (words.length <= numWords) {
    return str;
  }

  return words.slice(0, numWords).join(" ") + "...";
}
