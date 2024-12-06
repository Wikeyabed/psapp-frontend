import BijackPdf from "../../../../components/admin/orders/BijackPdf";
import { getCookie } from "cookies-next";

function Bijack({ order }) {
  return (
    <>
      <BijackPdf order={order} />
    </>
  );
}

export default Bijack;

export async function getServerSideProps({ req, res, params }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`,
    {
      headers: {
        token: getCookie("x-auth-token", { req, res }),
      },
    }
  );

  const order = await response.json();

  console.log(order);

  return {
    props: {
      order: order[0],
    },
  };
}
