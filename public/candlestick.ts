import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { isNumber, isString } from "../deps.ts";

export type CandlestickOptions = {
  /** e.g. `"ASD/USDT"` */
  symbol: `${string}/${string}`;

  /** a string representing the interval type. */
  interval: string;

  /** UTC timestamp in milliseconds. If not provided, this field will be set to the current time. */
  to?: number;

  /** UTC timestamp in milliseconds. */
  from?: number;

  /** default `10`, number of bars to be returned, this number will be capped at `500` */
  n?: number;
};

export type CandlestickResponse = SuccessResponse<{
  data: {
    /** close price */
    c: number;

    /** high price */
    h: number;

    /** interval */
    i: string;

    /** low price */
    l: number;

    /** open price */
    o: number;

    /** bar start time in milliseconds */
    ts: number;

    /** volume in quote asset */
    v: number;
  };

  /** message type */
  m: "bar";

  /** symbol */
  s: `${string}/${string}`;
}[]>;

const reviver: Reviver = (key, value) => {
  if (["c", "h", "l", "o", "v"].includes(key) && isString(value)) {
    return Number(value);
  }

  return value;
};

/** Returns a list of bars, with each contains the open/close/high/low prices of a symbol for a specific time range.
 * ```ts
 * import { fetchCandlestick } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 * await fetchBarInfo({ symbol: "BTC/USDT", interval: "1" })
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#historical-bar-data
 */
export function fetchCandlestick(
  { symbol, interval, to, from, n }: CandlestickOptions,
  init?: RequestInit,
): Promise<CandlestickResponse> {
  const url = new URL("barhist", BASE_URL);

  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);

  if (isNumber(to)) {
    url.searchParams.set("to", String(to));
  }

  if (isNumber(from)) {
    url.searchParams.set("from", String(from));
  }

  if (isNumber(n)) {
    url.searchParams.set("n", String(n));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
