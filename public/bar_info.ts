import { BASE_URL } from "./constants.ts";
import { jsonFetch, SuccessResponse } from "./_utils.ts";
import { reviver, TickerData } from "./ticker.ts";

export type BarInfoResponse = SuccessResponse<{
  /** name of the interval */
  name: string;

  /** length of the interval */
  intervalInMillis: number;
}[]>;

/** Returns a list of all bar intervals supported by the server.
 * ```ts
 * import { fetchBarInfo } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 * await fetchBarInfo()
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#bar-info
 */
export function fetchBarInfo(
  init?: RequestInit,
): Promise<BarInfoResponse> {
  const url = new URL("barhist/info", BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}

export type { TickerData };
