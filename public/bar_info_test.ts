import { anyArray, anyNumber, anyString, expect, test } from "../dev_deps.ts";
import { fetchBarInfo } from "./bar_info.ts";

test("fetchBarInfo", async () => {
  await expect(fetchBarInfo()).resolves.toEqual({
    code: 0,
    data: anyArray({
      name: anyString(),
      intervalInMillis: anyNumber(),
    }),
  });
});
