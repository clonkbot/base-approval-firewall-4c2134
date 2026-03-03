import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RiskOracle } from './components/RiskOracle';
import { ApprovalsList } from './components/ApprovalsList';
import { WalletModule } from './components/WalletModule';
import { SlashingPanel } from './components/SlashingPanel';
import { NetworkStats } from './components/NetworkStats';
import { ScanLines } from './components/ScanLines';
import './styles.css';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export interface Approval {
  id: string;
  spender: string;
  spenderName: string;
  token: string;
  amount: string;
  riskScore: number;
  riskLevel: RiskLevel;
  timestamp: number;
  blocked: boolean;
  rewritten: boolean;
}

export interface OracleUpdate {
  id: string;
  spender: string;
  oldScore: number;
  newScore: number;
  challenger: string;
  status: 'pending' | 'finalized' | 'slashed';
  stake: number;
  timestamp: number;
}

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [totalBlocked, setTotalBlocked] = useState(47);
  const [totalRewritten, setTotalRewritten] = useState(123);

  const [approvals, setApprovals] = useState<Approval[]>([
    {
      id: '0x1a2b',
      spender: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      spenderName: 'Uniswap V2 Router',
      token: 'USDC',
      amount: 'UNLIMITED',
      riskScore: 12,
      riskLevel: 'safe',
      timestamp: Date.now() - 86400000,
      blocked: false,
      rewritten: false,
    },
    {
      id: '0x3c4d',
      spender: '0xDEAD...BEEF',
      spenderName: 'Unknown Contract',
      token: 'WETH',
      amount: 'UNLIMITED',
      riskScore: 89,
      riskLevel: 'critical',
      timestamp: Date.now() - 3600000,
      blocked: true,
      rewritten: false,
    },
    {
      id: '0x5e6f',
      spender: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
      spenderName: 'Uniswap Universal Router',
      token: 'DAI',
      amount: '10,000',
      riskScore: 8,
      riskLevel: 'safe',
      timestamp: Date.now() - 7200000,
      blocked: false,
      rewritten: true,
    },
    {
      id: '0x7g8h',
      spender: '0xSUSP...1C10',
      spenderName: 'Suspicious DEX',
      token: 'USDT',
      amount: 'UNLIMITED',
      riskScore: 67,
      riskLevel: 'high',
      timestamp: Date.now() - 1800000,
      blocked: false,
      rewritten: true,
    },
    {
      id: '0x9i0j',
      spender: '0x1111...1111',
      spenderName: '1inch Router',
      token: 'WBTC',
      amount: 'UNLIMITED',
      riskScore: 23,
      riskLevel: 'low',
      timestamp: Date.now() - 43200000,
      blocked: false,
      rewritten: false,
    },
  ]);

  const [oracleUpdates, setOracleUpdates] = useState<OracleUpdate[]>([
    {
      id: 'ou1',
      spender: '0xDEAD...BEEF',
      oldScore: 45,
      newScore: 89,
      challenger: '0xORCL...001',
      status: 'finalized',
      stake: 0.5,
      timestamp: Date.now() - 7200000,
    },
    {
      id: 'ou2',
      spender: '0xSUSP...1C10',
      oldScore: 34,
      newScore: 67,
      challenger: '0xORCL...002',
      status: 'pending',
      stake: 0.3,
      timestamp: Date.now() - 1800000,
    },
    {
      id: 'ou3',
      spender: '0xFAKE...ORCL',
      oldScore: 12,
      newScore: 78,
      challenger: '0xMAL...ORCL',
      status: 'slashed',
      stake: 1.0,
      timestamp: Date.now() - 86400000,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setApprovals(prev => prev.map(a => ({
        ...a,
        riskScore: Math.max(0, Math.min(100, a.riskScore + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)))
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = () => {
    setConnected(true);
    setWalletAddress('0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6));
  };

  const handleBlockApproval = (id: string) => {
    setApprovals(prev => prev.map(a =>
      a.id === id ? { ...a, blocked: true, rewritten: false } : a
    ));
    setTotalBlocked(prev => prev + 1);
  };

  const handleRewriteApproval = (id: string) => {
    setApprovals(prev => prev.map(a =>
      a.id === id ? { ...a, rewritten: true, amount: '1,000', blocked: false } : a
    ));
    setTotalRewritten(prev => prev + 1);
  };

  const handleChallengeUpdate = (id: string) => {
    setOracleUpdates(prev => prev.map(u =>
      u.id === id ? { ...u, status: 'pending' as const } : u
    ));
  };

  return (
    <div className="app-container min-h-screen bg-[#0a0a0f] text-[#e0e0e0] relative overflow-x-hidden">
      <ScanLines />
      <div className="hex-grid-bg" />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <Header
          connected={connected}
          walletAddress={walletAddress}
          onConnect={handleConnect}
          totalBlocked={totalBlocked}
          totalRewritten={totalRewritten}
        />

        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-8 space-y-4 md:space-y-6">
            <NetworkStats />
            <ApprovalsList
              approvals={approvals}
              onBlock={handleBlockApproval}
              onRewrite={handleRewriteApproval}
            />
          </div>

          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <WalletModule connected={connected} />
            <RiskOracle updates={oracleUpdates} onChallenge={handleChallengeUpdate} />
            <SlashingPanel updates={oracleUpdates} />
          </div>
        </div>

        <footer className="mt-12 md:mt-16 pb-6 text-center">
          <p className="text-[#3a3a4a] text-xs font-mono tracking-wide">
            Requested by @justfocus672 · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
