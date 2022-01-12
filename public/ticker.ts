import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { isString } from "../deps.ts";

export type TickerOptions = {
  /** symbol that `base`/`quote` format */
  symbol: `${string}/${string}`;
};

type TickerData = {
  symbol: `${string}/${string}`;

  /** the traded price 24 hour ago */
  open: number;

  /** the last traded price */
  close: number;

  /** the highest price over the past 24 hours */
  high: number;

  /** the lowest price over the past 24 hours */
  low: number;

  /** the total traded volume in quote asset over the paste 24 hours */
  volume: number;

  /** the price and size at the current best ask level */
  ask: [number, number];

  /** the price and size at the current best bid level */
  bid: [
    number,
    number,
  ];
  type: string;
};

export type TickerResponse = SuccessResponse<TickerData>;

const reviver: Reviver = (key, value) => {
  if (
    ["open", "close", "high", "low", "volume"].includes(key) && isString(value)
  ) {
    return Number(value);
  }

  if (["ask", "bid"].includes(key) && Array.isArray(value)) {
    return value.map((v) => isString(v) ? Number(v) : v);
  }

  return value;
};

/** Get summary statistics of one symbol (spot market).
 * ```ts
 * import { fetchTicker } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 * await fetchTicker({ symbol: "ASD/USDT" })
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#ticker
 */
export function fetchTicker(
  { symbol }: TickerOptions,
  init?: RequestInit,
): Promise<TickerResponse> {
  const url = new URL("spot/ticker", BASE_URL);

  url.searchParams.set("symbol", symbol);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}

export type { TickerData };
export { reviver };
