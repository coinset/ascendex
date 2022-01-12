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

### fetchBarInfo

Returns a list of all bar intervals supported by the server.
[Docs](https://ascendex.github.io/ascendex-pro-api/#bar-info)

example:

```ts
import { fetchBarInfo } from "https://deno.land/x/ascendex@$VERSION/mod.ts";
await fetchBarInfo();
```

returns:

```ts
type BarInfoResponse = {
  code: 0;
  data: {
    name: string;
    intervalInMillis: number;
  }[];
};
```

### fetchOrderBook

Returns a list of order book.
[Docs](https://ascendex.github.io/ascendex-pro-api/#order-book-depth)

example:

```ts
import { fetchOrderBook } from "https://deno.land/x/ascendex@$VERSION/mod.ts";
await fetchOrderBook({ symbol: "BTC/USDT" });
```

parameters:

```ts
type OrderBookOptions = {
  symbol: `${string}/${string}`;
};
```

returns:

```ts
type OrderBookResponse = {
  code: 0;
  data: {
    m: "depth-snapshot";
    symbol: `${string}/${string}`;
    data: {
      seqnum: number;
      ts: number;
      asks: [number, number][];
      bids: [number, number][];
    };
  };
};
```

### fetchTrades

Returns a list of trade history.
[Docs](https://ascendex.github.io/ascendex-pro-api/#market-trades)

example:

```ts
import { fetchTrades } from "https://deno.land/x/ascendex@$VERSION/mod.ts";
await fetchTrades({ symbol: "BTC/USDT" });
```

parameters:

```ts
type TradesOptions = {
  symbol: `${string}/${string}`;
  n?: number | undefined;
};
```

returns:

```ts
type TradesResponse = {
  code: 0;
  data: {
    m: "trades";
    symbol: `${string}/${string}`;
    data: {
      seqnum: number;
      p: number;
      q: number;
      ts: number;
      bm: boolean;
    }[];
  };
};
```

### fetchCandlestick

Returns a list of bars, with each contains the open/close/high/low prices of a
symbol for a specific time range.
[Docs](https://ascendex.github.io/ascendex-pro-api/#historical-bar-data)

example:

```ts
import { fetchCandlestick } from "https://deno.land/x/ascendex@$VERSION/mod.ts";
await fetchBarInfo({ symbol: "BTC/USDT", interval: "1" });
```

parameters:

```ts
type CandlestickOptions = {
  symbol: `${string}/${string}`;
  interval: string;
  to?: number | undefined;
  from?: number | undefined;
  n?: number | undefined;
};
```

returns:

```ts
type CandlestickResponse = {
  code: 0;
  data: {
    data: {
      c: number;
      h: number;
      i: string;
      l: number;
      o: number;
      ts: number;
      v: number;
    };
    m: "bar";
    s: `${string}/${string}`;
  }[];
};
```
