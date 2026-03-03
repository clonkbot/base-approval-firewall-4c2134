import { FC, useState } from 'react';

interface WalletModuleProps {
  connected: boolean;
}

export const WalletModule: FC<WalletModuleProps> = ({ connected }) => {
  const [moduleEnabled, setModuleEnabled] = useState(true);
  const [autoBlock, setAutoBlock] = useState(true);
  const [autoRewrite, setAutoRewrite] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState(70);

  return (
    <div className="panel">
      <div className="panel-header">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#00ff88]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wider">Smart Wallet Module</h2>
        <div className={`ml-auto status-dot ${moduleEnabled ? 'active' : ''}`} />
      </div>

      <div className="p-4 space-y-4">
        {!connected ? (
          <div className="text-center py-6 text-[#6a6a7a] text-sm">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 mx-auto mb-3 opacity-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Connect wallet to configure module
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-3 bg-[#0d0d14] rounded">
              <div>
                <span className="text-sm">Firewall Module</span>
                <p className="text-[10px] text-[#6a6a7a] mt-0.5">ERC-4337 compliant</p>
              </div>
              <button
                onClick={() => setModuleEnabled(!moduleEnabled)}
                className={`w-12 h-6 rounded-full transition-all ${
                  moduleEnabled ? 'bg-[#00ff88]' : 'bg-[#2a2a3a]'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    moduleEnabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-[#a0a0a0]">Auto-block high risk</span>
                <button
                  onClick={() => setAutoBlock(!autoBlock)}
                  className={`w-10 h-5 rounded-full transition-all ${
                    autoBlock ? 'bg-[#ff3366]' : 'bg-[#2a2a3a]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      autoBlock ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-[#a0a0a0]">Auto-rewrite unlimited</span>
                <button
                  onClick={() => setAutoRewrite(!autoRewrite)}
                  className={`w-10 h-5 rounded-full transition-all ${
                    autoRewrite ? 'bg-[#00ff88]' : 'bg-[#2a2a3a]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      autoRewrite ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1a1a24]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6a6a7a]">Risk Threshold</span>
                <span className="text-xs font-mono text-[#ffaa00]">{riskThreshold}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00ff88 0%, #ffaa00 ${riskThreshold}%, #1a1a24 ${riskThreshold}%)`,
                }}
              />
              <div className="flex justify-between mt-1 text-[10px] text-[#4a4a5a]">
                <span>Safe</span>
                <span>Critical</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a1a24]">
              <div className="flex items-center gap-2 text-[10px] text-[#6a6a7a]">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>Approvals above threshold will be flagged for review</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
