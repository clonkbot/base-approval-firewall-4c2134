import { FC, useState, useEffect } from 'react';

export const NetworkStats: FC = () => {
  const [blockNumber, setBlockNumber] = useState(18472956);
  const [gasPrice, setGasPrice] = useState(0.0012);
  const [oracleLatency, setOracleLatency] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber(prev => prev + 1);
      setGasPrice(prev => Math.max(0.0001, prev + (Math.random() - 0.5) * 0.0002));
      setOracleLatency(prev => Math.max(50, Math.min(500, prev + Math.floor((Math.random() - 0.5) * 20))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel data-stream">
      <div className="p-3 md:p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#6a6a7a] uppercase tracking-wider">Network</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-4 rounded-full bg-[#0052ff] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">B</span>
              </div>
              <span className="text-sm font-bold text-[#0052ff]">Base Mainnet</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-[#6a6a7a] uppercase tracking-wider">Block</span>
            <span className="text-sm font-mono mt-1 tabular-nums">#{blockNumber.toLocaleString()}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-[#6a6a7a] uppercase tracking-wider">Gas Price</span>
            <span className="text-sm font-mono mt-1 tabular-nums">{gasPrice.toFixed(4)} gwei</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-[#6a6a7a] uppercase tracking-wider">Oracle Latency</span>
            <span className={`text-sm font-mono mt-1 tabular-nums ${oracleLatency > 300 ? 'text-[#ffaa00]' : 'text-[#00ff88]'}`}>
              {oracleLatency}ms
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
