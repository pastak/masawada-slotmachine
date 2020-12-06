import React, { useCallback, useEffect, useRef, useState } from "react";

export type SlotProps = Readonly<{
  symbols: readonly string[];
  initialIndex: number;
  state: "rolling" | "stopped";
  onStop: (newIndex: number) => void;
}>;

export const Slot: React.FC<SlotProps> = ({
  symbols,
  initialIndex,
  state,
  onStop,
}) => {
  const interval = useRef<ReturnType<Window["setInterval"]> | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number>(initialIndex);
  const indexRef = useRef<number>(initialIndex);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  const setNextIndex = useCallback(() => {
    let nextIndex = indexRef.current + 1;
    if (nextIndex >= symbols.length) {
      nextIndex = 0;
    }
    setIndex(nextIndex);
    //    indexRef.current = nextIndex;
  }, [symbols]);

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
      <span>{symbols[index]}</span>
      <br />
      <button onClick={() => stop()} disabled={state === "stopped"}>
        stop
      </button>
    </div>
  );
};
