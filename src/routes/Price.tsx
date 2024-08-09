import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";
import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: 500;
`;

const Overview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  /*background-color: #111010;
  padding: 10px 20px;
  border-radius: 10px; */
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /* span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  } */
  border: solid 1px ${(props) => props.theme.textColor};
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  padding: 10px;
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  market_data: {
    current_price: {
      usd: number;
    };
    total_value_locked: object;
    mcap_to_tvl_ratio: object;
    fdv_to_tvl_ratio: object;
    roi: object;
    ath: object;
    ath_change_percentage: object;
    ath_date: object;
    atl: object;
    atl_change_percentage: object;
    atl_date: object;
    market_cap: { usd: number };
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    fully_diluted_valuation: object;
    market_cap_fdv_ratio: number;
    total_volume: { usd: number };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    price_change_24h_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_1h_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_24h_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_7d_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_14d_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_30d_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_60d_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_200d_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    price_change_percentage_1y_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    market_cap_change_24h_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    market_cap_change_percentage_24h_in_currency: {
      btc: number;
      eth: number;
      usd: number;
    };
    total_supply: number;
    max_supply: object;
    circulating_supply: number;
    last_updated: string;
  };
  symbol: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinInfo(coinId)
  );

  return (
    <div>
      {isLoading || !data ? (
        "Loading price data"
      ) : (
        <>
          <Title>{`${coinId.toUpperCase()} market data`}</Title>
          <Overview>
            <OverviewItem>
              <span>Current price :</span>
              <span>
                ${data.market_data.current_price.usd.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Price change 24h: </span>
              <span>
                ${data.market_data.price_change_24h.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>High 24: </span>
              <span>
                ${data.market_data.high_24h.usd.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Low 24: </span>
              <span>
                ${data.market_data.low_24h.usd.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Price change percentage 1h: </span>
              <span>
                {data.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                  3
                )}
                %
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Price change percentage 24h: </span>
              <span>
                {data.market_data.price_change_percentage_24h.toFixed(3)}%
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Price change percentage 7d: </span>
              <span>
                {data.market_data.price_change_percentage_7d.toFixed(3)}%
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Price change percentage 14d: </span>
              <span>
                {data.market_data.price_change_percentage_14d.toFixed(3)}%
              </span>
            </OverviewItem>
            <OverviewItem>
              <span> Market cap: </span>
              <span>
                ${data.market_data.market_cap.usd.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Market cap change 24h: </span>
              <span>
                $
                {data.market_data.market_cap_change_24h.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Market cap change percentage 24h: </span>
              <span>
                {data.market_data.market_cap_change_percentage_24h.toFixed(3)}%
              </span>
            </OverviewItem>
            <OverviewItem>
              <span>Total volume </span>
              <span>
                ${data.market_data.total_volume.usd.toLocaleString("ko-KR")}
              </span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </div>
  );
}

export default Price;
