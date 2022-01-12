import {
  anyArray,
  anyBoolean,
  anyNumber,
  anyString,
  expect,
  test,
} from "../dev_deps.ts";
import { fetchTrades } from "./trades.ts";
import { hasSlash } from "./_utils.ts";

test("fetchTrades", async () => {
  await expect(fetchTrades({ symbol: "BTC/USDT" })).resolves.toEqual({
    code: 0,
    data: {
      m: "trades",
      symbol: anyString(hasSlash),
      data: anyArray({
        p: anyNumber(),
        q: anyNumber(),
        ts: anyNumber(),
        bm: anyBoolean(),
        seqnum: anyNumber(),
      }),
    },
  });
});
