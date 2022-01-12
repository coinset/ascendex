import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchCandlestick } from "./candlestick.ts";
import { hasSlash } from "./_utils.ts";

test("fetchCandlestick", async () => {
  await expect(fetchCandlestick({ symbol: "BTC/USDT", interval: "1" })).resolves
    .toEqual({
      code: 0,
      data: anyArray({
        m: "bar",
        s: anyString(hasSlash),
        data: {
          i: anyString(),
          ts: anyNumber(),
          o: anyNumber(),
          c: anyNumber(),
          h: anyNumber(),
          l: anyNumber(),
          v: anyNumber(),
        },
      }),
    });
});
