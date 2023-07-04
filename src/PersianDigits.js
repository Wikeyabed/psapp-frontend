import React from "react";

export default function PersianNumber({ number }) {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let en_number = numberWithCommas(number);
  let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  let persianMap = persianDigits.split("");
  let persian_number = en_number.replace(/\d/g, function (m) {
    return persianMap[parseInt(m)];
  });

  return <span>{persian_number}</span>;
}
