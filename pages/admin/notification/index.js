import React, { useState, useEffect } from "react";
import CommentList from "../../../components/admin/comments";
import { getCookie } from "cookies-next";

export default function Notification({ notification }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [notification]);
  return (
    <>
      {loading ? (
        <p>در حال بارگذاری...</p> // Show a loading message until the products are loaded
      ) : (
        // <CommentList comments={comments} />
        ""
      )}
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const prods = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`);

//   const comments = await prods.json();

//   return {
//     props: {
//       comments,
//     },
//   };
// }
