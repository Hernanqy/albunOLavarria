export type MapZone = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  qrCode: string;
  cardId: string;
  position: {
    x: number;
    y: number;
  };
};

export const mapZones: MapZone[] = [
  {
    id: "museo",
    name: "Museo",
    subtitle: "Patrimonio y memoria",
    description: "Zona para desbloquear figuritas vinculadas a museos, objetos, historia y archivo.",
    qrCode: "PATRIMONIO-07",
    cardId: "palacio",
    position: { x: 24, y: 30 }
  },
  {
    id: "arroyo",
    name: "Arroyo Tapalqué",
    subtitle: "Paisaje y territorio",
    description: "Zona para reconocer el agua, el paisaje urbano y la memoria ambiental.",
    qrCode: "NATURALEZA-19",
    cardId: "arroyo",
    position: { x: 58, y: 38 }
  },
  {
    id: "maxima",
    name: "La Máxima",
    subtitle: "Naturaleza y educación",
    description: "Zona para desbloquear figuritas de ambiente, fauna y recorridos educativos.",
    qrCode: "NATURALEZA-20",
    cardId: "la-maxima",
    position: { x: 76, y: 68 }
  },
  {
    id: "centro",
    name: "Centro",
    subtitle: "Ciudad y patrimonio",
    description: "Zona para trabajar edificios, plazas, recorridos urbanos e instituciones.",
    qrCode: "HISTORIA-01",
    cardId: "fundacion",
    position: { x: 42, y: 58 }
  },
  {
    id: "barrios",
    name: "Barrios",
    subtitle: "Relatos vecinales",
    description: "Zona para recuperar memorias de clubes, escuelas, plazas y comunidad.",
    qrCode: "BARRIOS-18",
    cardId: "relatos-vecinales",
    position: { x: 18, y: 72 }
  },
  {
    id: "cultura",
    name: "Cultura",
    subtitle: "Fiestas y relatos",
    description: "Zona para desbloquear expresiones culturales, leyendas y encuentros.",
    qrCode: "CULTURA-29",
    cardId: "cultura",
    position: { x: 70, y: 22 }
  }
];
