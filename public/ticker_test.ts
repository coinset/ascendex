import { anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchTicker } from "./ticker.ts";

test("fetchTicker", async () => {
  await expect(fetchTicker({ symbol: "ASD/USDT" })).resolves.toEqual({
    code: 0,
    data: {
      symbol: anyString((v) => /\w+\/\w+/.test(v)),
      type: anyString(),
      open: anyNumber(),
      close: anyNumber(),
      high: anyNumber(),
      low: anyNumber(),
      volume: anyNumber(),
      ask: [anyNumber(), anyNumber()],
      bid: [anyNumber(), anyNumber()],
    },
  });
});
