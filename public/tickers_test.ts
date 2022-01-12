import { anyArray, expect, test } from "../dev_deps.ts";
import { fetchTickers } from "./tickers.ts";
import { dataEquality } from "./ticker_test.ts";

const equality = {
  code: 0,
  data: anyArray(dataEquality),
};

test("fetchTickers", async () => {
  await expect(fetchTickers()).resolves.toEqual(equality);

  await expect(fetchTickers({ symbols: ["ASD/USDT"] })).resolves.toEqual(
    equality,
  );

  await expect(fetchTickers({ symbols: ["ASD/USDT", "BTC/USDT"] })).resolves
    .toEqual(
      equality,
    );
});
