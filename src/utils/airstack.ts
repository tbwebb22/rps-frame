import { init } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY);

import { fetchQuery } from "@airstack/node";

interface QueryResponse {
  data: Data;
  error: Error;
}

interface Data {
  Wallet: Wallet;
}

interface Error {
  message: string;
}

interface Wallet {
  socials: Social[];
  addresses: string[];
}

interface Social {
  dappName: "farcaster";
  profileName: string;
}

const query = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;

export const airstackQuery = async () => {
  try {
    const { data, error }: QueryResponse = await fetchQuery(query);

    if (error) {
      console.error('Airstack error:', error);
      throw new Error(error.message);
    }

    if (!data) {
      console.error('No data returned from Airstack');
      throw new Error('No data returned from Airstack');
    }

    console.log('Airstack response:', data);
    return data;
  } catch (e) {
    console.error('Airstack query failed:', e);
    throw e;
  }
};