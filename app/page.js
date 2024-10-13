"use client";

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CoinCard from './components/CoinCard';

export default function Home() {
  const [coinData, setCoinData] = useState(null);
  const [marketCap, setMarketCap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contractAddress, setContractAddress] = useState('');

  // Fetch coin data initially (including market cap)
  const fetchCoinData = async (contract) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://frontend-api.pump.fun/coins/${contract}`);
      if (!res.ok) {
        throw new Error('Coin not found');
      }
      const data = await res.json();
      setCoinData(data);
      setMarketCap(data.usd_market_cap);  // Set initial market cap
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch and update market cap every 30 seconds
  const updateMarketCap = async (contract) => {
    try {
      const res = await fetch(`https://frontend-api.pump.fun/coins/${contract}`);
      if (!res.ok) {
        throw new Error('Failed to fetch market cap');
      }
      const data = await res.json();
      setMarketCap(data.usd_market_cap);  // Only update the market cap
    } catch (err) {
      console.error('Error updating market cap:', err);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      // Fetch initial data
      fetchCoinData(contractAddress);

      // Set interval to update only market cap every 30 seconds
      const intervalId = setInterval(() => {
        updateMarketCap(contractAddress);
      }, 30000);  // 30 seconds

      // Clear interval on component unmount to avoid memory leaks
      return () => clearInterval(intervalId);
    }
  }, [contractAddress]);

  const handleSearch = (address) => {
    setContractAddress(address);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="py-8 bg-gray-800 w-full shadow-md">
        <h1 className="text-center text-4xl font-extrabold">DexPump Coin Search</h1>
      </header>

      <main className="mt-12 w-full px-4">
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {coinData && <CoinCard coin={coinData} marketCap={marketCap} />}
      </main>
    </div>
  );
}
