import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const ButtonBox = styled.div`
  position: absolute;
  right: 20px;
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
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border: 1px solid white;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 34px;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  market_cap_rank: number;
  total_supply: number;
  max_supply: number;
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <ButtonBox>
          <button onClick={toggleDarkAtom}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </ButtonBox>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: {
                    name: coin.name,
                    total_supply: coin.total_supply,
                    max_supply: coin.max_supply,
                  },
                }}
              >
                <Img src={coin.image} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
