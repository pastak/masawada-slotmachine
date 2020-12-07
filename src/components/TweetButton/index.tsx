import React, { FC } from "react";

interface TweetParameters {
  readonly message?: string;
  readonly hashtags?: string[];
  readonly url?: string;
}

type TweetButtonProps = TweetParameters;

const formatParameters = (input: TweetParameters): URLSearchParams => {
  const params = new URLSearchParams();
  if (input.message !== undefined) {
    params.set("text", input.message);
  }
  if (input.hashtags !== undefined) {
    for (const ht of input.hashtags) {
      params.append("hashtags", ht);
    }
  }
  if (input.url !== undefined) {
    params.set("url", input.url);
  }
  return params;
};

export const TweetButton: FC<TweetButtonProps> = (props) => (
  <a href={`https://twitter.com/intent/tweet?${formatParameters(props)}`}>
    Tweet your result
  </a>
);
