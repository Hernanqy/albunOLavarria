import { Building2, Landmark, Leaf, Users } from "lucide-react";
import type { AlbumCard } from "../../types/album";

type Props = {
  card: AlbumCard;
  size?: number;
};

export function IconForCard({ card, size = 34 }: Props) {
  if (card.icon === "building") return <Building2 size={size} />;
  if (card.icon === "leaf") return <Leaf size={size} />;
  if (card.icon === "users") return <Users size={size} />;
  return <Landmark size={size} />;
}
