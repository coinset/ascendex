import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { isNumber, isString } from "../deps.ts";

export type TradesOptions = {
  /** Valid symbol supported by exchange */
  symbol: `${string}/${string}`;

  /** any positive integer, capped at `100`
   * number of trades to return. */
  n?: number;
};

export type TradesResponse = SuccessResponse<{
  m: "trades";

  /** e.g. `"ASD/USDT"` */
  symbol: `${string}/${string}`;

  /** actual bid and ask info. See below for detail. */
  data: {
    /** the sequence number of the trade record.
     * `seqnum` is always increasing for each symbol, but may not be consecutive */
    seqnum: number;

    /** trade price in string format */
    p: number;

    /** trade size in string format */
    q: number;

    /** UTC timestamp in milliseconds */
    ts: number;

    /** If `true`, the maker of the trade is the buyer. */
    bm: boolean;
  }[];
}>;

const reviver: Reviver = (key, value) => {
  if (["p", "q"].includes(key) && isString(value)) {
    return Number(value);
  }

  return value;
};

/** Returns a list of trade history.
 * ```ts
 * import { fetchTrades } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 * await fetchTrades({ symbol: "BTC/USDT" })
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#market-trades
 */
export function fetchTrades(
  { symbol, n }: TradesOptions,
  init?: RequestInit,
): Promise<TradesResponse> {
  const url = new URL("trades", BASE_URL);

  if (isNumber(n)) {
    url.searchParams.set("n", String(n));
  }

  url.searchParams.set("symbol", symbol);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
