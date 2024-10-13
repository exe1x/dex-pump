export default function CoinCard({ coin, marketCap }) {
    return (
      <div className="bg-gray-800 text-white rounded-lg p-6 mb-6 w-full max-w-lg mx-auto shadow-lg">
        <div className="flex items-center">
          <img
            src={coin.image_uri}
            alt={coin.name}
            className="w-20 h-20 mr-6 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{coin.name}</h2>
            <p className="text-sm text-gray-300">Ticker: {coin.symbol}</p>
          </div>
        </div>
  
        <div className="mt-6">
          {/* Market Cap updates dynamically */}
          <p className="text-lg"><strong>Market Cap:</strong> ${marketCap.toFixed(2)}</p>
          <p className="text-lg"><strong>Supply:</strong> {coin.total_supply.toLocaleString()}</p>
          <p className="text-lg"><strong>Replies:</strong> {coin.reply_count}</p>
          <p className="text-lg"><strong>NSFW:</strong> {coin.nsfw ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }
  