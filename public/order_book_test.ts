import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchOrderBook } from "./order_book.ts";

test("fetchOrderBook", async () => {
  await expect(fetchOrderBook({ symbol: "BTC/USDT" })).resolves.toEqual({
    code: 0,
    data: {
      m: "depth-snapshot",
      symbol: anyString(),
      data: {
        ts: anyNumber(),
        seqnum: anyNumber(),
        asks: anyArray([anyNumber(), anyNumber()]),
        bids: anyArray([anyNumber(), anyNumber()]),
      },
    },
  });
});
