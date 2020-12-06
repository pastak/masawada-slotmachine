import React, { useCallback, useRef, useState } from "react";
import { Slot, useSlot } from "./Slot";

type SlotmachineProps = Readonly<{
  symbols: readonly string[];
}>;

export const Slotmachine: React.FC<SlotmachineProps> = ({
  symbols: _symbols,
}) => {
  // explicitly *freeze* symbols with initial value
  const [symbols] = useState(_symbols);
  const [machineState, setMachineState] = useState<"rolling" | "stopped">(
    "stopped"
  );
  const results = useRef<(string | undefined)[]>([]);
  const checkResult = useCallback(() => {
    if (symbols.find((_, index) => results.current[index] === undefined)) {
      return;
    }
    console.log(results);
    if (results.current.join("-") === "ma-sa-wa-da") {
      // success!
      window.alert("success!");
    } else {
      window.alert("残念でした！");
    }
    // reset status
    results.current = [];
    setMachineState("stopped");
  }, []);
  // generally we should not call hooks inside conditional statements (symbols.map) to keep orders of hooks called.
  // but here we've been freezed symbols, therefore we can stabilize call order, so I believe this is safe.
  const onStops = symbols.map((_v, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCallback((symbol: string) => {
      results.current[i] = symbol;
      checkResult();
    }, [])
  );
  const propsAndStarts = symbols.map((initialSymbol, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
