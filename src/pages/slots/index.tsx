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
      <hr />
      <dl>
        <dt>author</dt>
        <dd>
          <a href="https://github.com/astj">astj</a>
        </dd>
        <dt>what's this?</dt>
        <dd>
          <a href="https://blog.astj.space/entry/2020/12/06/235824">
            masawada advent calender 2020 12/06
          </a>
        </dd>
      </dl>
    </div>
  );
};

export default SlotPage;
