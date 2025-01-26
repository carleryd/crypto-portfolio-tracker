import { z } from "zod";

const COINGECKO_BASE_API = "https://api.coingecko.com/api/v3";

const getBaseAPI = (path: string) =>
  `${COINGECKO_BASE_API}${path}&x_cg_demo_api_key=${import.meta.env.VITE_COINGECKO_TOKEN}`;

/**
 * Based on schema source for Coingecko API responses:
 * https://docs.coingecko.com/v3.0.1/reference/search-data
 */
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
// TODO: Rename
export type FetchedCurrency = CurrencySearchResponse["coins"][0];

export const fetchCurrencies = async (
  searchTerm: string,
): Promise<CurrencySearchResponse> => {
  const path = `/search?query=${searchTerm}`;
  const url = getBaseAPI(path);
  // TODO: Use RemoteData?
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
