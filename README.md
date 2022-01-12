# @coinset/ascendex

Universal AscendEX API client

:children_crossing: This is not official

## Public API

A request for an entry point that does not require authentication.

### fetchAssets

You can obtain a list of all assets listed on the exchange through this API.
[Docs](https://ascendex.github.io/ascendex-pro-api/#list-all-assets)

example:

```ts
import { fetchAssets } from "https://deno.land/x/ascendex@$VERSION/mod.ts";

await fetchAssets();
```

returns:

```ts
type AssetsResponse = {
  code: 0;
  data: {
    assetCode: string;
    assetName: string;
    precisionScale: number;
    nativeScale: number;
    blockChain: {
      chainName: string;
      withdrawFee: number;
      allowDeposit: boolean;
      allowWithdraw: boolean;
      minDepositAmt: number;
      minWithdrawal: number;
      numConfirmations: number;
    }[];
  }[];
};
```

### fetchProducts

You can obtain a list of all products traded on the exchange through this API.
[Docs](https://ascendex.github.io/ascendex-pro-api/#list-all-products)

example:

```ts
import { fetchProducts } from "https://deno.land/x/ascendex@$VERSION/mod.ts";

await fetchProducts();
```

returns:

```ts
type ProductsResponse = {
  code: 0;
  data: {
    symbol: string;
    displayName: string;
    baseAsset: string;
    quoteAsset: string;
    status: "Normal" | "NoTrading" | "InternalTrading";
    minNotional: number;
    maxNotional: number;
    marginTradable: boolean;
    commissionType: "Base" | "Quote" | "Received";
    commissionReserveRate: number;
    tickSize: number;
    lotSize: number;
  }[];
};
```

### fetchTicker

Get summary statistics of one symbol (spot market).
[Docs](https://ascendex.github.io/ascendex-pro-api/#ticker)

example:

```ts
import { fetchTicker } from "https://deno.land/x/ascendex@$VERSION/mod.ts";
await fetchTicker({ symbol: "ASD/USDT" });
```

parameters:

```ts
type TickerOptions = {
  symbol: `${string}/${string}`;
};
```

returns:

```ts
type TickerResponse = {
  code: 0;
  data: {
    symbol: `${string}/${string}`;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    ask: [number, number];
    bid: [
      number,
      number,
    ];
    type: string;
  };
};
```

### fetchTickers

Get summary statistics of multi symbols (spot market).
[Docs](https://ascendex.github.io/ascendex-pro-api/#ticker)

example:

```ts
import { fetchTickers } from "https://deno.land/x/ascendex@$VERSION/mod.ts";
await fetchTickers();
```

parameters:

```ts
type TickersOptions = {
  symbols: `${string}/${string}`[];
};
```

returns:

```ts
type TickersResponse = {
  code: 0;
  data: {
    symbol: `${string}/${string}`;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    ask: [number, number];
    bid: [
      number,
      number,
    ];
    type: string;
  }[];
};
```
