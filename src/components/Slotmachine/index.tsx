import React, { useCallback, useRef, useState } from "react";
import { SlotProps, Slot } from "./Slot";

const symbols = ["ma", "sa", "wa", "da"] as const;

export const Slotmachine: React.FC = () => {
  const [machineState, setMachineState] = useState<"rolling" | "stopped">(
    "stopped"
  );
  const [stateMa, setStateMa] = useState<SlotProps["state"]>("stopped");
  const [stateSa, setStateSa] = useState<SlotProps["state"]>("stopped");
  const [stateWa, setStateWa] = useState<SlotProps["state"]>("stopped");
  const [stateDa, setStateDa] = useState<SlotProps["state"]>("stopped");
  const results = useRef<(number | undefined)[]>([]);
  const checkResult = () => {
    if (
      results.current[0] == undefined ||
      results.current[1] == undefined ||
      results.current[2] == undefined ||
      results.current[3] == undefined
    ) {
      return;
    }
    if (
      results.current[0] === 0 &&
      results.current[1] === 1 &&
      results.current[2] === 2 &&
      results.current[3] === 3
    ) {
      // success!
      window.alert("success!");
    } else {
      window.alert("残念でした！");
    }
    // reset status
    results.current = [];
    setMachineState("stopped");
  };
  const onUpdateMa = useCallback(
    (index: number) => {
      setStateMa("stopped");
      results.current[0] = index;
      checkResult();
    },
    [checkResult]
  );
  const onUpdateSa = useCallback(
    (index: number) => {
      setStateSa("stopped");
      results.current[1] = index;
      checkResult();
    },
    [checkResult]
  );
  const onUpdateWa = useCallback(
    (index: number) => {
      setStateWa("stopped");
      results.current[2] = index;
      checkResult();
    },
    [checkResult]
  );
  const onUpdateDa = useCallback(
    (index: number) => {
      setStateDa("stopped");
      results.current[3] = index;
      checkResult();
    },
    [checkResult]
  );

  const start = () => {
    setMachineState("rolling");
    setStateMa("rolling");
    setStateSa("rolling");
    setStateWa("rolling");
    setStateDa("rolling");
  };
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Slot
                symbols={symbols}
                initialIndex={0}
                state={stateMa}
                onStop={onUpdateMa}
              />
            </td>
            <td>
              <Slot
                symbols={symbols}
                initialIndex={1}
                state={stateSa}
                onStop={onUpdateSa}
              />
            </td>
            <td>
              <Slot
                symbols={symbols}
                initialIndex={2}
                state={stateWa}
                onStop={onUpdateWa}
              />
            </td>
            <td>
              <Slot
                symbols={symbols}
                initialIndex={3}
                state={stateDa}
                onStop={onUpdateDa}
              />
            </td>
          </tr>
          <tr>
            <td rowSpan={4}>
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
