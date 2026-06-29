import type { ReactNode } from "react";

type Props = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
};

export function AlbumSpread({ left, right, className = "" }: Props) {
  return (
    <section className={`album-spread ${className}`}>
      <div className="album-page album-page-left">{left}</div>
      <div className="album-page album-page-right">{right}</div>
    </section>
  );
}
