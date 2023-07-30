const str = [
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
  "بیست",
];
const num = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export function persianNumber(number) {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let en_number = numberWithCommas(number);
  let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  let persianMap = persianDigits.split("");
  let persian_number = en_number.replace(/\d/g, function (m) {
    return persianMap[parseInt(m)];
  });

  return persian_number;
}
