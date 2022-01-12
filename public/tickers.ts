import { BASE_URL } from "./constants.ts";
import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { reviver, TickerData } from "./ticker.ts";

export type TickersOptions = {
  /** symbols that `base`/`quote` format */
  symbols: `${string}/${string}`[];
};

export type TickersResponse = SuccessResponse<TickerData[]>;

/** Get summary statistics of multi symbols (spot market).
 * ```ts
 * import { fetchTickers } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 * await fetchTickers()
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#ticker
 */
export function fetchTickers(
  options?: TickersOptions,
  init?: RequestInit,
): Promise<TickersResponse> {
  const url = new URL("spot/ticker", BASE_URL);
  const _symbols = options?.symbols;

  if (Array.isArray(_symbols)) {
    const _s = _symbols.length === 1 ? [..._symbols, ""] : _symbols;
    url.searchParams.set("symbol", _s.join(","));
  }

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}

export type { TickerData };
