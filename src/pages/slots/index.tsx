import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";

const SlotPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>masawada slot!!!</title>
      </Head>
      <h1>masawada slot!!</h1>
    </div>
  );
};

export default SlotPage;

const slotCandidates = ["ma", "sa", "wa", "da"] as const;

type SlotProps = Readonly<{
  initialIndex: number;
  state: "rolling" | "stopped";
  onStop: (newIndex: number) => void;
}>;

const Slotmachine: React.FC = () => {
  const [stateMa, setStateMa] = useState<SlotProps["state"]>("stopped");
  const [stateSa, setStateSa] = useState<SlotProps["state"]>("stopped");
  const [stateWa, setStateWa] = useState<SlotProps["state"]>("stopped");
  const [stateDa, setStateDa] = useState<SlotProps["state"]>("stopped");
  const results = useRef<number[]>([]);
  const checkResult = () => {
    if (
      results.current[0] == 0 &&
      results.current[1] == 1 &&
      results.current[2] == 2 &&
      results.current[3] == 3
    ) {
      // success!
      window.alert("success!");
      // todo reset state (or )
    }
  };
  const onUpdateMa = useCallback(
    (index: number) => {
      setStateMa("stopped");
      results.current[0] = index;
      checkResult();
    },
    [checkResult]
  );

  const start = () => {
    setStateMa("rolling");
    setStateSa("rolling");
    setStateWa("rolling");
    setStateDa("rolling");
  };
  return <div></div>;
};
const Slot: React.FC<SlotProps> = ({ initialIndex, state, onStop }) => {
  const interval = useRef<ReturnType<Window["setInterval"]> | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number>(initialIndex);
  const setNextIndex = useCallback(() => {
    if (index > slotCandidates.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }, []);

  useEffect(() => {
    if (state === "rolling") {
      interval.current = window.setInterval(() => {
        setNextIndex();
      }, 100);
    }
    return () => {
      if (interval.current) {
        window.clearInterval(interval.current);
      }
    };
  }, [state]);
  const stop = () => {
    window.clearInterval(interval.current);
    onStop(index);
  };

  return (
    <div>
      <input readOnly value={slotCandidates[index]} />
      <input type="button" onClick={() => stop()} />
    </div>
  );
};
