import { join } from "lodash";
import { z } from "zod";

const COINGECKO_BASE_API = "https://api.coingecko.com/api/v3";
const COINGECKO_SIMPLE_API = `${COINGECKO_BASE_API}/simple`;

/**
 * All API requests and schemas are based on the Coingecko API (Demo plan).
 * See https://docs.coingecko.com/v3.0.1
 */
const getApiUrl = (apiUrl: string) => (path: string) =>
  `${apiUrl}${path}&x_cg_demo_api_key=${import.meta.env.VITE_COINGECKO_TOKEN}`;
const getBaseApi = getApiUrl(COINGECKO_BASE_API);
const getSimpleApi = getApiUrl(COINGECKO_SIMPLE_API);

const coinGeckoSearchSchema = z.object({
  coins: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      api_symbol: z.string(),
      symbol: z.string(),
      market_cap_rank: z.number().nullable(),
      thumb: z.string(),
      large: z.string(),
    }),
  ),
});

export type CurrencySearchResponse = z.infer<typeof coinGeckoSearchSchema>;
export type FetchedCurrency = CurrencySearchResponse["coins"][0];

export const searchCurrencies = async (
  searchTerm: string,
): Promise<CurrencySearchResponse> => {
  const path = `/search?query=${searchTerm}`;
  const url = getBaseApi(path);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch transaction status: ${response.statusText}`,
    );
  }

  const data = await response.json();

  const parsedResponse = coinGeckoSearchSchema.safeParse(data);

  if (!parsedResponse.success) {
    throw new Error(
      `Failed to parse search response: ${parsedResponse.error.message}`,
    );
  }

  return parsedResponse.data;
};

const coinGeckoPriceUsdSchema = z.record(
  z.object({
    usd: z.number().positive(),
    usd_market_usd: z.number().optional(),
    usd_24h_usd: z.number().optional(),
    usd_24h_changusd: z.number().optional(),
    last_updatedusd: z.number().positive().optional(),
  }),
);

export type CurrencyPriceUsdResponse = z.infer<typeof coinGeckoPriceUsdSchema>;

export const fetchCurrencyPriceUsd = async (
  currencyIds: string[],
): Promise<CurrencyPriceUsdResponse> => {
  const path = `/price?ids=${join(currencyIds, ",")}&vs_currencies=usd`;
  const url = getSimpleApi(path);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch transaction status: ${response.statusText}`,
    );
  }

  const data = await response.json();

  const parsedResponse = coinGeckoPriceUsdSchema.safeParse(data);

  if (!parsedResponse.success) {
    throw new Error(
      `Failed to parse search response: ${parsedResponse.error.message}`,
    );
  }

  return parsedResponse.data;
};

/**
 * Array of arrays of length 5: [time, open, high, low, close]
 */
const coinGeckoHistoricalOhlcUsdSchema = z.array(
  z.tuple([z.number(), z.number(), z.number(), z.number(), z.number()]),
);

export type CurrencyHistoricalOhlcUsdResponse = z.infer<
  typeof coinGeckoHistoricalOhlcUsdSchema
>;

export const fetchCurrencyHistoricalPriceDataUsd = async (
  currencyId: string,
  days: number,
): Promise<CurrencyHistoricalOhlcUsdResponse> => {
  const path = `/coins/${currencyId}/ohlc?vs_currency=usd` + `&days=${days}`;

  const url = getBaseApi(path);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch transaction status: ${response.statusText}`,
    );
  }

  const data = await response.json();

  const parsedResponse = coinGeckoHistoricalOhlcUsdSchema.safeParse(data);

  if (!parsedResponse.success) {
    throw new Error(
      `Failed to parse search response: ${parsedResponse.error.message}`,
    );
  }

  return parsedResponse.data;
};
