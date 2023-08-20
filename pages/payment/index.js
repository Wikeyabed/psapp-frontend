import React from "react";
import shortUUID from "short-uuid";
import { useSearchParams } from "next/navigation";

function Payment() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const track_id = searchParams.get("track_id");
  const order_id = searchParams.get("order_id");
  const status = searchParams.get("status");
  return (
    <div>
      
      {id} , {track_id} , {order_id} , {status}
    </div>
  );
}

export default Payment;
