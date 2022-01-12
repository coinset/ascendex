import { BASE_URL } from "./constants.ts";
import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";

export type ProductsResponse = SuccessResponse<{
  /** e.g. `"ASD/USDT"` */
  symbol: string;

  /** display name */
  displayName: string;

  /** e.g. `"ASD"` */
  baseAsset: string;

  /** e.g. `"USDT"` */
  quoteAsset: string;

  /** trading status */
  status: "Normal" | "NoTrading" | "InternalTrading";

  /** minimum notional of an order */
  minNotional: number;

  /** maximum notional of an order */
  maxNotional: number;

  /** `true` if the product is tradable in the margin account; `false` otherwise. */
  marginTradable: boolean;

  /** type of commission */
  commissionType: "Base" | "Quote" | "Received";

  commissionReserveRate: number;

  /** tick size of order price */
  tickSize: number;

  /** lot size of order quantity */
  lotSize: number;
}[]>;

const reviver: Reviver = (key, value) => {
  if (key === "data" && Array.isArray(value)) {
    return value.map(
      (
        {
          minNotional,
          maxNotional,
          commissionReserveRate,
          tickSize,
          lotSize,
          ...rest
        },
      ) => {
        return {
          ...rest,
          minNotional: Number(minNotional),
          maxNotional: Number(maxNotional),
          commissionReserveRate: Number(commissionReserveRate),
          tickSize: Number(tickSize),
          lotSize: Number(lotSize),
        };
      },
    );
  }
  return value;
};

/** You can obtain a list of all products traded on the exchange through this API.
 * ```ts
 * import { fetchProducts } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 * await fetchProducts()
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#list-all-products
 */
export function fetchProducts(init?: RequestInit): Promise<ProductsResponse> {
  const url = new URL("products", BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
