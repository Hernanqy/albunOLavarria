import type { Rarity, Section } from "../types/album";

export const sections: Section[] = [
  {
    id: "historia",
    name: "Historia",
    description: "Hechos, procesos y memoria de la ciudad.",
    color: "#b85a3d",
    softColor: "#f8d8c6"
  },
  {
    id: "personajes",
    name: "Personajes",
    description: "Vidas, oficios y trayectorias locales.",
    color: "#e87923",
    softColor: "#fde2b8"
  },
  {
    id: "barrios",
    name: "Barrios",
    description: "Relatos vecinales, clubes, plazas y comunidad.",
    color: "#e8b83e",
    softColor: "#fff0b8"
  },
  {
    id: "patrimonio",
    name: "Patrimonio",
    description: "Museos, edificios, objetos y lugares con historia.",
    color: "#287fa6",
    softColor: "#caecf7"
  },
  {
    id: "naturaleza",
    name: "Naturaleza",
    description: "Sierras, arroyo, fauna, flora y territorio.",
    color: "#4f9b58",
    softColor: "#d8f0ce"
  },
  {
    id: "cultura",
    name: "Cultura",
    description: "Fiestas, leyendas, deportes y vida cotidiana.",
    color: "#8f4ba8",
    softColor: "#ecd3f4"
  }
];

export const rarities: Rarity[] = [
  { id: "comun", name: "Común", description: "Figurita de acceso general." },
  { id: "especial", name: "Especial", description: "Figurita con valor narrativo o visual." },
  { id: "historica", name: "Histórica", description: "Hecho clave de memoria local." },
  { id: "patrimonial", name: "Patrimonial", description: "Bien u objeto de valor cultural." },
  { id: "vecinal", name: "Vecinal", description: "Historia comunitaria o barrial." },
  { id: "legendaria", name: "Legendaria", description: "Difícil de conseguir." },
  { id: "secreta", name: "Secreta", description: "Oculta por desafío o recorrido." }
];

export function getSection(id: string | undefined) {
  return sections.find((section) => section.id === id);
}

export function getRarity(id: string | undefined) {
  return rarities.find((rarity) => rarity.id === id);
}
