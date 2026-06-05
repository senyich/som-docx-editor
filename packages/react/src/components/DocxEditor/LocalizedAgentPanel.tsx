import { useTranslation } from '../../i18n';
import type { AgentPanelOptions } from './types';

// Simple stub for AgentPanel since @som/docx-editor-agents is not available
function AgentPanel({
  title,
  closeLabel,
  resizeHandleLabel,
  defaultWidth,
  minWidth,
  maxWidth,
  onClose,
  closed,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  closeLabel: string;
  resizeHandleLabel: string;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onClose: () => void;
  closed: boolean;
  children: React.ReactNode;
}) {
  if (closed) return null;
  return (
    <div style={{ width: defaultWidth ?? 300, minWidth, maxWidth }}>
      <div>
        <span>{title}</span>
        <button onClick={onClose} aria-label={closeLabel}>
          ×
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

/**
 * Inner wrapper that calls `useTranslation` to forward localised labels
 * down to AgentPanel. Lives below the LocaleProvider so the context is
 * resolved.
 */
export function LocalizedAgentPanel({
  agentPanel,
  closed,
  onClose,
}: {
  agentPanel: AgentPanelOptions;
  closed: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  return (
    <AgentPanel
      title={agentPanel.title ?? t('agentPanel.defaultTitle')}
      icon={agentPanel.icon}
      closeLabel={t('agentPanel.close')}
      resizeHandleLabel={t('agentPanel.resizeHandle')}
      defaultWidth={agentPanel.defaultWidth}
      minWidth={agentPanel.minWidth}
      maxWidth={agentPanel.maxWidth}
      onClose={onClose}
      closed={closed}
    >
      {agentPanel.render({ close: onClose })}
    </AgentPanel>
  );
}
