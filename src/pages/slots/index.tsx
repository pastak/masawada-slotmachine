import React from "react";
import Head from "next/head";
import { Slotmachine } from "../../components/Slotmachine";

const SlotPage: React.FC = () => {
  const symbols = ["ma", "sa", "wa", "da"] as const;
  // const symbols = ["ma", "sa", "wa", "pa", "pi", "x"] as const;

  return (
    <div>
      <Head>
        <title>masawada slot!!!</title>
      </Head>
      <h1>masawada slot!!</h1>
      <hr />
      <Slotmachine symbols={symbols} />
    </div>
  );
};

export default SlotPage;
