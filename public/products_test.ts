import {
  anyArray,
  anyBoolean,
  anyNumber,
  anyOf,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchProducts } from "./products.ts";

test("fetchProducts", async () => {
  await expect(fetchProducts()).resolves.toEqual({
    code: 0,
    data: anyArray({
      symbol: anyString(),
      displayName: anyString(),
      baseAsset: anyString(),
      quoteAsset: anyString(),
      status: anyOf(["Normal", "NoTrading", "InternalTrading"]),
      minNotional: anyNumber(),
      maxNotional: anyNumber(),
      marginTradable: anyBoolean(),
      commissionType: anyOf(["Base", "Quote", "Received"]),
      commissionReserveRate: anyNumber(),
      tickSize: anyNumber(),
      lotSize: anyNumber(),
    }),
  });
});
