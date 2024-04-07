import { useState, useEffect } from "react";
import axios from "axios";

import Transactions from "./components/Transactions";

function App() {
  const [price, setPrice] = useState<number>();
  const [walletBalance, setWalletBalance] = useState<number>();
  const X_API_KEY = import.meta.env.VITE_X_API_KEY as string;

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((response) => {
        setPrice(response.data.data.amount);
      })
      .catch((err) => console.error(err));
  };

  const getWalletBalance = () => {
    const headers = {
      "X-Api-Key": X_API_KEY,
    };

    axios
      .get("https://legend.lnbits.com/api/v1/wallet", { headers })
      .then((response) => {
        setWalletBalance((response.data.balance as number) / 1000);
      });
  };

  useEffect(() => {
    getPrice();
    getWalletBalance();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
      getWalletBalance();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 font-mono text-purple-500">
      <header className="border-solid border-2 border-slate-800 border-b-yellow-500 text-center">
        <h1 className="text-xl font-bold">Pleb Wallet</h1>
      </header>
      <div className="w-full flex justify-between sm:flex-col">
        <div className="bg-yellow-500 border-solid border-2 border-purple-500 rounded p-2 w-1/4 mt-4 mb-2 ml-2 md:w-full md:text-center md:mx-[2%] sm:w-4/5 sm:my-0 sm:mx-auto sm:mt-[1%]">
          <h2>Balance</h2>
          <p className="text-xl font-bold">{walletBalance} sats</p>
        </div>
        <div className="bg-yellow-500 border-solid border-2 border-purple-500 rounded p-2 w-1/4 mt-4 mb-2 mr-2 md:w-full md:text-center md:mx-[2%] sm:w-4/5 sm:my-0 sm:mx-auto sm:mt-[1%]">
          <h2>Price</h2>
          <p className="text-xl font-bold">${price}</p>
        </div>
      </div>
      <div className="w-full flex justify-between sm:flex-col">
        <div className="bg-slate-50 border-solid border-2 border-purple-500 rounded h-72 w-2/5 overflow-scroll ml-2 md:w-full md:h-48 sm:mt-[1%]">
          <Transactions />
        </div>
        <div className="bg-slate-50 border-solid border-2 border-purple-500 rounded h-72 w-2/5 overflow-scroll mr-2 md:w-full md:h-48 sm:mt-[1%]"></div>
      </div>
      <footer className="bg-slate-800 border-solid border-2 border-slate-800 border-t-yellow-500 p-2 text-center fixed bottom-0 w-full ">
        <p className="text-sm italic">Made by Plebs, for Plebs</p>
      </footer>
    </div>
  );
}

export default App;
