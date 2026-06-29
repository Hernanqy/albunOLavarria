type Props = {
  value: number;
  label: string;
};

export function ProgressRing({ value, label }: Props) {
  const safeValue = Math.max(0, Math.min(100, value));
  const angle = safeValue * 3.6;

  return (
    <div className="progress-ring" style={{ background: `conic-gradient(#7c3f2c ${angle}deg, rgba(124,63,44,.16) 0deg)` }}>
      <div className="progress-ring__inner">
        <strong>{safeValue}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}
