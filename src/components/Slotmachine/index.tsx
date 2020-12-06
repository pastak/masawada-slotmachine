import React, { useCallback, useRef, useState } from "react";
import { Slot, useSlot } from "./Slot";

type SlotmachineProps = Readonly<{
  symbols: readonly string[];
}>;

export const Slotmachine: React.FC<SlotmachineProps> = ({ symbols }) => {
  const [machineState, setMachineState] = useState<"rolling" | "stopped">(
    "stopped"
  );
  const results = useRef<(string | undefined)[]>([]);
  const checkResult = () => {
    if (symbols.find((_, index) => results.current[index] === undefined)) {
      return;
    }
    if (results.current.join("-") === "ma-sa-wa-da") {
      // success!
      window.alert("success!");
    } else {
      window.alert("残念でした！");
    }
    // reset status
    results.current = [];
    setMachineState("stopped");
  };
  const onStops = symbols.map((_v, i) =>
    useCallback(
      (symbol: string) => {
        results.current[i] = symbol;
        checkResult();
      },
      [checkResult]
    )
  );
  const propsAndStarts = symbols.map((initialSymbol, i) =>
    useSlot({ symbols, initialSymbol, onStop: onStops[i] })
  );

  const start = () => {
    setMachineState("rolling");
    propsAndStarts.forEach(({ start }) => start());
  };
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {propsAndStarts.map(({ props }) => (
              <td key={props.initialIndex}>
                <Slot {...props} />
              </td>
            ))}
          </tr>
          <tr>
            <td rowSpan={symbols.length}>
              <button
                onClick={() => start()}
                disabled={machineState === "rolling"}
              >
                start!!
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
