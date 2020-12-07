import React, { useState } from "react";
import Head from "next/head";
import { Slotmachine, StoppedSlots } from "../../components/Slotmachine";
import { Footer } from "../../components/Footer";
import { ShareResultButton } from "../../components/ShareResultButton";

const SlotPage: React.FC = () => {
  const [stoppedSlots, setStoppedSlots] = useState<StoppedSlots | undefined>();
  const onStopped = (slots: StoppedSlots): void => setStoppedSlots(slots);
  const symbols = ["ma", "sa", "wa", "da"] as const;
  // const symbols = ["ma", "sa", "wa", "pa", "pi", "x"] as const;

  return (
    <div>
      <Head>
        <title>masawada slot!!!</title>
      </Head>
      <h1>masawada slot!!</h1>
      <hr />
      <Slotmachine symbols={symbols} onStopped={onStopped} />
      <ShareResultButton result={stoppedSlots} />
      <hr />
      <Footer />
    </div>
  );
};

export default SlotPage;
