import { FC, useState, useEffect } from 'react';
import type { OracleUpdate } from '../App';

interface SlashingPanelProps {
  updates: OracleUpdate[];
}

export const SlashingPanel: FC<SlashingPanelProps> = ({ updates }) => {
  const [totalSlashed, setTotalSlashed] = useState(12.5);
  const [slashEvents, setSlashEvents] = useState(8);

  const slashedUpdates = updates.filter(u => u.status === 'slashed');

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setTotalSlashed(prev => prev + Math.random() * 0.5);
        setSlashEvents(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel">
      <div className="panel-header">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#ff3366]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wider">Slashing Monitor</h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-[#1a0a10] border border-[#ff3366]/20 rounded p-3">
            <div className="text-[10px] text-[#ff3366]/70 uppercase tracking-wider">Total Slashed</div>
            <div className="text-xl font-mono font-bold text-[#ff3366] mt-1 tabular-nums">
              {totalSlashed.toFixed(2)} ETH
            </div>
          </div>
          <div className="bg-[#0d0d14] border border-[#1a1a24] rounded p-3">
            <div className="text-[10px] text-[#6a6a7a] uppercase tracking-wider">Events</div>
            <div className="text-xl font-mono font-bold text-[#e0e0e0] mt-1 tabular-nums">
              {slashEvents}
            </div>
          </div>
        </div>

        <div className="text-[10px] text-[#6a6a7a] uppercase tracking-wider mb-2">
          Recent Slashing Events
        </div>

        <div className="space-y-2">
          {slashedUpdates.length > 0 ? (
            slashedUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-center justify-between p-2 bg-[#1a0a10] border border-[#ff3366]/20 rounded"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#ff3366]/20 flex items-center justify-center threat-indicator">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3 h-3 text-[#ff3366]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-[#a0a0a0]">{update.challenger}</span>
                    <div className="text-[10px] text-[#ff3366]/70">Malicious update detected</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-[#ff3366]">-{update.stake} ETH</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-[#4a4a5a] text-xs">
              No recent slashing events
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-[#0a0a0f] border border-[#1a1a24] rounded">
          <div className="flex items-start gap-2">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-[#ffaa00] mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className="text-[10px] text-[#a0a0a0]">
              <p className="font-semibold text-[#ffaa00] mb-1">Slashing Mechanism</p>
              <p>Oracles submitting false risk scores are slashed. 100% of stake is distributed to challengers who detect malicious updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
