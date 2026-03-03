import { FC } from 'react';
import type { Approval, RiskLevel } from '../App';

interface ApprovalsListProps {
  approvals: Approval[];
  onBlock: (id: string) => void;
  onRewrite: (id: string) => void;
}

const getRiskColor = (level: RiskLevel): string => {
  switch (level) {
    case 'critical': return 'text-[#ff3366]';
    case 'high': return 'text-[#ff6600]';
    case 'medium': return 'text-[#ffaa00]';
    case 'low': return 'text-[#00ff88]';
    case 'safe': return 'text-[#00ccff]';
  }
};

const formatTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const ApprovalsList: FC<ApprovalsListProps> = ({ approvals, onBlock, onRewrite }) => {
  return (
    <div className="panel">
      <div className="panel-header">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#ffaa00]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <h2 className="text-sm font-semibold uppercase tracking-wider">Token Approvals Monitor</h2>
        <span className="ml-auto text-xs text-[#6a6a7a]">{approvals.length} active</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-[#1a1a24]">
              <th className="text-left p-3 md:p-4 text-[#6a6a7a] font-normal uppercase tracking-wider text-[10px]">Spender</th>
              <th className="text-left p-3 md:p-4 text-[#6a6a7a] font-normal uppercase tracking-wider text-[10px]">Token</th>
              <th className="text-left p-3 md:p-4 text-[#6a6a7a] font-normal uppercase tracking-wider text-[10px]">Amount</th>
              <th className="text-left p-3 md:p-4 text-[#6a6a7a] font-normal uppercase tracking-wider text-[10px]">Risk</th>
              <th className="text-left p-3 md:p-4 text-[#6a6a7a] font-normal uppercase tracking-wider text-[10px]">Status</th>
              <th className="text-right p-3 md:p-4 text-[#6a6a7a] font-normal uppercase tracking-wider text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((approval) => (
              <tr key={approval.id} className="approval-row border-b border-[#1a1a24] last:border-0">
                <td className="p-3 md:p-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-white">{approval.spenderName}</span>
                    <span className="text-[10px] text-[#6a6a7a] font-mono">{approval.spender}</span>
                    <span className="text-[10px] text-[#4a4a5a]">{formatTimeAgo(approval.timestamp)}</span>
                  </div>
                </td>
                <td className="p-3 md:p-4">
                  <span className="px-2 py-1 bg-[#1a1a24] rounded text-xs font-mono">{approval.token}</span>
                </td>
                <td className="p-3 md:p-4">
                  <span className={`font-mono ${approval.amount === 'UNLIMITED' ? 'text-[#ff3366]' : 'text-[#e0e0e0]'}`}>
                    {approval.amount}
                  </span>
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex flex-col gap-2 min-w-[100px]">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold tabular-nums ${getRiskColor(approval.riskLevel)}`}>
                        {approval.riskScore}
                      </span>
                      <span className={`tag tag-${approval.riskLevel}`}>
                        {approval.riskLevel}
                      </span>
                    </div>
                    <div className="risk-bar">
                      <div
                        className={`risk-bar-fill ${approval.riskLevel}`}
                        style={{ width: `${approval.riskScore}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-3 md:p-4">
                  {approval.blocked ? (
                    <span className="tag tag-blocked">BLOCKED</span>
                  ) : approval.rewritten ? (
                    <span className="tag tag-rewritten">REWRITTEN</span>
                  ) : (
                    <span className="tag tag-pending">ACTIVE</span>
                  )}
                </td>
                <td className="p-3 md:p-4">
                  <div className="flex items-center justify-end gap-2">
                    {!approval.blocked && !approval.rewritten && (
                      <>
                        <button
                          onClick={() => onRewrite(approval.id)}
                          className="btn btn-warning text-[10px] py-1.5 px-2.5 min-h-[36px]"
                        >
                          Rewrite
                        </button>
                        <button
                          onClick={() => onBlock(approval.id)}
                          className="btn btn-danger text-[10px] py-1.5 px-2.5 min-h-[36px]"
                        >
                          Block
                        </button>
                      </>
                    )}
                    {(approval.blocked || approval.rewritten) && (
                      <button className="btn btn-ghost text-[10px] py-1.5 px-2.5 min-h-[36px]">
                        Details
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
