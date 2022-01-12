import { anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchTicker } from "./ticker.ts";
import { hasSlash } from "./_utils.ts";

export const dataEquality = {
  symbol: anyString(hasSlash),
  type: anyString(),
  open: anyNumber(),
  close: anyNumber(),
  high: anyNumber(),
  low: anyNumber(),
  volume: anyNumber(),
  ask: [anyNumber(), anyNumber()],
  bid: [anyNumber(), anyNumber()],
};

test("fetchTicker", async () => {
  await expect(fetchTicker({ symbol: "ASD/USDT" })).resolves.toEqual({
    code: 0,
    data: dataEquality,
  });
});
