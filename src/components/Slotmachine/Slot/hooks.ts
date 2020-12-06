import { useCallback, useState } from "react";
import { SlotProps } from "./Slot";

type UseSlotPropsParams = Readonly<{
  symbols: SlotProps["symbols"];
  initialSymbol: string;
  onStop: (symbol: string) => void;
}>;

export const useSlot: (
  params: UseSlotPropsParams
) => { props: SlotProps; start: () => void } = ({
  symbols,
  initialSymbol,
  onStop: _onStop,
}) => {
  const [state, setState] = useState<SlotProps["state"]>("stopped");
  const onStop = useCallback(
    (index: number) => {
      setState("stopped");
      _onStop(symbols[index]);
    },
    [_onStop, symbols]
  );
  const start = useCallback(() => {
    setState("rolling");
  }, []);
  const initialIndex = symbols.findIndex((v) => v === initialSymbol);
  if (initialIndex === -1) {
    throw new Error("initialSymbol not found");
  }
  return {
    props: {
      symbols,
      initialIndex,
      state,
      onStop,
    },
    start,
  };
};
