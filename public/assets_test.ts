import {
  anyArray,
  anyBoolean,
  anyNumber,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchAssets } from "./assets.ts";

test("fetchAssets", async () => {
  await expect(fetchAssets()).resolves.toEqual({
    code: 0,
    data: anyArray({
      assetCode: anyString(),
      assetName: anyString(),
      precisionScale: anyNumber(),
      nativeScale: anyNumber(),
      blockChain: anyArray({
        chainName: anyString(),
        withdrawFee: anyNumber(),
        allowDeposit: anyBoolean(),
        allowWithdraw: anyBoolean(),
        minDepositAmt: anyNumber(),
        minWithdrawal: anyNumber(),
        numConfirmations: anyNumber(),
      }),
    }),
  });
});
