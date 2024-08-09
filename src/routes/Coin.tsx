import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  button {
    border: 0;
    background-color: transparent;
    font-size: 40px;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;
const ButtonBox = styled.div`
  position: absolute;
  right: -87px;
  top: 40px;
  button {
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 5px;
    padding: 5px 10px;
    color: ${(props) => props.theme.textColor};
    background-color: transparent;
    cursor: pointer;
    font-size: 12px;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Description = styled.p`
  margin: 20px 0px;
  button {
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 5px;
    padding: 2px 5px;
    color: ${(props) => props.theme.textColor};
    background-color: transparent;
    cursor: pointer;
    font-size: 12px;
    display: absolute;
    margin-left: 20px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
  total_supply: number;
  max_supply: number;
}

interface InfoData {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: object;
  platforms: object;
  detail_platforms: object;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: object;
  preview_listing: boolean;
  public_notice: object;
  additional_notices: object;
  localization: object;
  description: { en: string; ko: string };
  links: object;
  image: object;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
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
    market_cap: object;
    market_cap_rank: number;
    fully_diluted_valuation: object;
    market_cap_fdv_ratio: number;
    total_volume: object;
    high_24h: object;
    low_24h: object;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: object;
    price_change_percentage_1h_in_currency: object;
    price_change_percentage_24h_in_currency: object;
    price_change_percentage_7d_in_currency: object;
    price_change_percentage_14d_in_currency: object;
    price_change_percentage_30d_in_currency: object;
    price_change_percentage_60d_in_currency: object;
    price_change_percentage_200d_in_currency: object;
    price_change_percentage_1y_in_currency: object;
    market_cap_change_24h_in_currency: object;
    market_cap_change_percentage_24h_in_currency: object;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: string;
  };
  community_data: object;
  developer_data: object;
  status_updates: object;
  last_updated: string;
  tickers: object;
}

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const history = useHistory();
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const [readMore, setReadMore] = useState(false);
  const toggleReadMore = () => setReadMore((current) => !current);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : infoLoading
            ? "Loading..."
            : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <ButtonBox>
          <button onClick={toggleDarkAtom}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </ButtonBox>
        <button onClick={() => history.goBack()}>⬅</button>
        <Title>
          {state?.name
            ? state.name
            : infoLoading
            ? "Loading..."
            : infoData?.name}
        </Title>
        <button>
          <Link to={"/"}>🏛</Link>
        </button>
      </Header>
      {infoLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.market_cap_rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>
                ${infoData?.market_data.current_price?.usd.toFixed(3)}
              </span>
            </OverviewItem>
          </Overview>
          <Description>
            {readMore
              ? infoData?.description.ko
              : infoData?.description.ko.slice(0, 500) + "..."}
            <button onClick={toggleReadMore}>
              {readMore ? "전체 내용 접기" : "전체 내용 보기"}
            </button>
          </Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{infoData?.market_data.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max supply:</span>
              <span>{infoData?.market_data.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
