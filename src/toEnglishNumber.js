var persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
const arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g,
];

export const fixPersianNumber = (str) => {
  if (typeof str === "string") {
    for (var i = 0; i < 10; i++) {
      str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }
  }
  return str;
};
