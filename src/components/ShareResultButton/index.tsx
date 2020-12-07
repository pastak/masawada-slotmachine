import React, { FC } from "react";
import { StoppedSlots } from "../Slotmachine";
import { TweetButton } from "../TweetButton";

interface ShareResultButtonProps {
  readonly result?: StoppedSlots;
}

export const ShareResultButton: FC<ShareResultButtonProps> = ({ result }) =>
  result !== undefined ? (
    <TweetButton
      message={result.join("→")}
      url={window.location.href}
      hashtags={["masawadaslot"]}
    />
  ) : null;
