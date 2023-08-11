import RequestSingle from "../../../components/admin/requests/RequestSingle";
import { getCookie } from "cookies-next";

function CheckRequest({ request }) {
  return <RequestSingle request={request} />;
}

export default CheckRequest;

export async function getServerSideProps({ req, res, params }) {
  const prods = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/requests/${params.requestId}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const request = await prods.json();

  return {
    props: {
      request,
    },
  };
}
