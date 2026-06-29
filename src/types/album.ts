export type View =
  | "cover"
  | "index"
  | "section"
  | "sticker"
  | "pack"
  | "scanner"
  | "map";

export type SectionId =
  | "historia"
  | "patrimonio"
  | "barrios"
  | "naturaleza"
  | "cultura"
  | "personajes";

export type AlbumSection = {
  id: SectionId;
  name: string;
  subtitle: string;
  description: string;
  color: string;
};

export type AlbumCard = {
  id: string;
  number: number;
  title: string;
  sectionId: SectionId;
  section: string;
  color: string;
  icon: "landmark" | "building" | "leaf" | "users";
  pasted: boolean;
  imageLabel: string;
  description: string;
};
