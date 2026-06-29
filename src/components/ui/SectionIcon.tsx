import {
  BookOpen,
  Building2,
  Landmark,
  Leaf,
  Map,
  Theater,
  Users
} from "lucide-react";
import type { SectionId } from "../../types/album";

type Props = {
  section: SectionId;
  className?: string;
};

export function SectionIcon({ section, className = "h-5 w-5" }: Props) {
  if (section === "historia") return <Landmark className={className} />;
  if (section === "personajes") return <Users className={className} />;
  if (section === "barrios") return <Map className={className} />;
  if (section === "patrimonio") return <Building2 className={className} />;
  if (section === "naturaleza") return <Leaf className={className} />;
  if (section === "cultura") return <Theater className={className} />;
  return <BookOpen className={className} />;
}
