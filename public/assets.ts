import { jsonFetch, Reviver, SuccessResponse } from "./_utils.ts";
import { BASE_URL } from "./constants.ts";

export type AssetsResponse = SuccessResponse<{
  /** asset code. e.g. `"BTC"` */
  assetCode: string;

  /** full name of the asset, e.g. `"Bitcoin"` */
  assetName: string;

  /** scale used in internal position keeping. */
  precisionScale: number;

  /** scale used in deposit/withdraw transaction from/to chain. */
  nativeScale: number;

  /** block chain specific details */
  blockChain: {
    /** name of the blockchain */
    chainName: string;

    /** fee charged for each withdrawal request. e.g. `"0.01"` */
    withdrawFee: number;

    /** allow deposit */
    allowDeposit: boolean;

    /** allow withdrawal */
    allowWithdraw: boolean;

    /** minimum amount required for the deposit request e.g. `"0.0"` */
    minDepositAmt: number;

    /** minimum amount required for the withdrawal request e.g. `"50"` */
    minWithdrawal: number;

    /** number of confirmations needed for the exchange to recognize a deposit */
    numConfirmations: number;
  }[];
}[]>;

const reviver: Reviver = (key, value) => {
  if (key === "blockChain" && Array.isArray(value)) {
    return value.map(
      ({ withdrawFee, minDepositAmt, minWithdrawal, ...rest }) => {
        return {
          ...rest,
          withdrawFee: Number(withdrawFee),
          minDepositAmt: Number(minDepositAmt),
          minWithdrawal: Number(minWithdrawal),
        };
      },
    );
  }

  return value;
};

/** You can obtain a list of all assets listed on the exchange through this API.
 * ```ts
 * import { fetchAssets } from "https://deno.land/x/ascendex@$VERSION/mod.ts"
 *
 * await fetchAssets()
 * ```
 * @see https://ascendex.github.io/ascendex-pro-api/#list-all-assets
 */
export function fetchAssets(init?: RequestInit): Promise<AssetsResponse> {
  const url = new URL("assets", BASE_URL);

  return jsonFetch(url, init, {
    parseJson: reviver,
  });
}
