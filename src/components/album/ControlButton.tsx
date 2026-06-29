import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

export function ControlButton({ icon, label, onClick }: Props) {
  return (
    <button className="album-control-button" onClick={onClick}>
      <span className="album-control-button__inner">{icon}</span>
      <small>{label}</small>
    </button>
  );
}
