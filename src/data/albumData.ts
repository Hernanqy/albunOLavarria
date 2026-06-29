import type { AlbumCard, AlbumSection } from "../types/album";

export const sections: AlbumSection[] = [
  {
    id: "historia",
    name: "Historia",
    subtitle: "Procesos y memoria",
    description: "Hechos, procesos y transformaciones que ayudan a leer la ciudad.",
    color: "#59f0e7"
  },
  {
    id: "patrimonio",
    name: "Patrimonio",
    subtitle: "Lugares y objetos",
    description: "Edificios, museos, objetos y espacios que conservan memoria cultural.",
    color: "#78d7ff"
  },
  {
    id: "barrios",
    name: "Barrios",
    subtitle: "Vida comunitaria",
    description: "Relatos vecinales, clubes, plazas, instituciones y memorias cotidianas.",
    color: "#ffd166"
  },
  {
    id: "naturaleza",
    name: "Naturaleza",
    subtitle: "Territorio vivo",
    description: "Arroyo, sierras, fauna, flora, bioparque y paisajes locales.",
    color: "#76f28a"
  },
  {
    id: "cultura",
    name: "Cultura",
    subtitle: "Relatos y encuentros",
    description: "Fiestas, leyendas, deportes, expresiones artísticas y vida social.",
    color: "#d78bff"
  },
  {
    id: "personajes",
    name: "Personajes",
    subtitle: "Vidas y trayectorias",
    description: "Personas, oficios, memorias familiares y figuras de la comunidad.",
    color: "#ff9f6e"
  }
];

export const cards: AlbumCard[] = [
  {
    id: "fundacion",
    number: 1,
    title: "Fundación de Olavarría",
    sectionId: "historia",
    section: "Historia",
    color: "#59f0e7",
    icon: "landmark",
    pasted: true,
    imageLabel: "Origen de la ciudad",
    description: "Una figurita para comenzar el recorrido por los procesos que dieron forma a Olavarría."
  },
  {
    id: "frontera",
    number: 2,
    title: "Frontera y territorio",
    sectionId: "historia",
    section: "Historia",
    color: "#59f0e7",
    icon: "landmark",
    pasted: false,
    imageLabel: "Espacio de frontera",
    description: "El territorio puede leerse como un espacio de encuentros, tensiones, caminos y memorias."
  },
  {
    id: "estacion",
    number: 3,
    title: "Estación Olavarría",
    sectionId: "historia",
    section: "Historia",
    color: "#59f0e7",
    icon: "landmark",
    pasted: false,
    imageLabel: "Memoria ferroviaria",
    description: "El ferrocarril conectó viajes, trabajo, comercio e historias familiares."
  },
  {
    id: "inmigracion",
    number: 4,
    title: "Memoria inmigrante",
    sectionId: "historia",
    section: "Historia",
    color: "#59f0e7",
    icon: "users",
    pasted: false,
    imageLabel: "Familias y trabajo",
    description: "Apellidos, recetas, fotografías y relatos familiares ayudan a reconstruir memorias migrantes."
  },
  {
    id: "industria",
    number: 5,
    title: "Ciudad del trabajo",
    sectionId: "historia",
    section: "Historia",
    color: "#59f0e7",
    icon: "building",
    pasted: true,
    imageLabel: "Industria local",
    description: "La industria, las canteras y los oficios forman parte de la identidad productiva local."
  },
  {
    id: "sierras-bayas",
    number: 6,
    title: "Sierras Bayas",
    sectionId: "historia",
    section: "Historia",
    color: "#59f0e7",
    icon: "leaf",
    pasted: false,
    imageLabel: "Localidad serrana",
    description: "Las localidades del partido amplían el álbum y permiten contar otras memorias."
  },

  {
    id: "palacio",
    number: 7,
    title: "Palacio Municipal",
    sectionId: "patrimonio",
    section: "Patrimonio",
    color: "#78d7ff",
    icon: "building",
    pasted: true,
    imageLabel: "Arquitectura histórica",
    description: "Un edificio emblemático para reconocer la vida institucional y urbana de Olavarría."
  },
  {
    id: "museo-damaso",
    number: 8,
    title: "Museo Dámaso Arce",
    sectionId: "patrimonio",
    section: "Patrimonio",
    color: "#78d7ff",
    icon: "building",
    pasted: false,
    imageLabel: "Colecciones",
    description: "Un museo conserva, investiga y comunica objetos, relatos y memorias de la comunidad."
  },
  {
    id: "puentes",
    number: 9,
    title: "Puentes colgantes",
    sectionId: "patrimonio",
    section: "Patrimonio",
    color: "#78d7ff",
    icon: "building",
    pasted: false,
    imageLabel: "Recorrido urbano",
    description: "Los puentes ayudan a pensar la ciudad como recorrido, conexión y experiencia."
  },
  {
    id: "casonas",
    number: 10,
    title: "Casonas y fachadas",
    sectionId: "patrimonio",
    section: "Patrimonio",
    color: "#78d7ff",
    icon: "building",
    pasted: false,
    imageLabel: "Huellas urbanas",
    description: "Las fachadas antiguas permiten leer transformaciones urbanas y formas de habitar."
  },
  {
    id: "archivo",
    number: 11,
    title: "Archivo histórico",
    sectionId: "patrimonio",
    section: "Patrimonio",
    color: "#78d7ff",
    icon: "landmark",
    pasted: false,
    imageLabel: "Documentos y memoria",
    description: "Los archivos permiten sostener investigaciones, recuerdos y derechos culturales."
  },
  {
    id: "objetos",
    number: 12,
    title: "Objetos con historia",
    sectionId: "patrimonio",
    section: "Patrimonio",
    color: "#78d7ff",
    icon: "building",
    pasted: true,
    imageLabel: "Patrimonio material",
    description: "Un objeto puede contar muchas historias según cómo se lo investigue y exhiba."
  },

  {
    id: "barrio-centro",
    number: 13,
    title: "Centro urbano",
    sectionId: "barrios",
    section: "Barrios",
    color: "#ffd166",
    icon: "building",
    pasted: true,
    imageLabel: "Calles y memoria",
    description: "El centro reúne instituciones, comercios, recorridos cotidianos y memorias urbanas."
  },
  {
    id: "club-barrio",
    number: 14,
    title: "Club de barrio",
    sectionId: "barrios",
    section: "Barrios",
    color: "#ffd166",
    icon: "users",
    pasted: false,
    imageLabel: "Comunidad",
    description: "Los clubes guardan relatos deportivos, sociales y afectivos de varias generaciones."
  },
  {
    id: "plaza-barrial",
    number: 15,
    title: "Plaza barrial",
    sectionId: "barrios",
    section: "Barrios",
    color: "#ffd166",
    icon: "leaf",
    pasted: false,
    imageLabel: "Encuentro vecinal",
    description: "Una plaza puede ser escenario de juegos, encuentros, celebraciones y recuerdos."
  },
  {
    id: "escuela-barrio",
    number: 16,
    title: "Escuela del barrio",
    sectionId: "barrios",
    section: "Barrios",
    color: "#ffd166",
    icon: "building",
    pasted: false,
    imageLabel: "Aprendizajes",
    description: "Las escuelas son parte de la memoria comunitaria y de los vínculos cotidianos."
  },
  {
    id: "almacen",
    number: 17,
    title: "Almacén de esquina",
    sectionId: "barrios",
    section: "Barrios",
    color: "#ffd166",
    icon: "building",
    pasted: false,
    imageLabel: "Vida cotidiana",
    description: "Los comercios cercanos muchas veces guardan historias de confianza, charla y comunidad."
  },
  {
    id: "relatos-vecinales",
    number: 18,
    title: "Relatos vecinales",
    sectionId: "barrios",
    section: "Barrios",
    color: "#ffd166",
    icon: "users",
    pasted: true,
    imageLabel: "Memoria oral",
    description: "Cada barrio puede contar su historia desde las voces de quienes lo habitan."
  },

  {
    id: "arroyo",
    number: 19,
    title: "Arroyo Tapalqué",
    sectionId: "naturaleza",
    section: "Naturaleza",
    color: "#76f28a",
    icon: "leaf",
    pasted: true,
    imageLabel: "Paisaje y territorio",
    description: "El arroyo forma parte del paisaje cotidiano y de la memoria ambiental de la ciudad."
  },
  {
    id: "la-maxima",
    number: 20,
    title: "La Máxima",
    sectionId: "naturaleza",
    section: "Naturaleza",
    color: "#76f28a",
    icon: "leaf",
    pasted: true,
    imageLabel: "Bioparque y educación",
    description: "Un espacio para recorrer, observar y aprender desde la experiencia."
  },
  {
    id: "sierras",
    number: 21,
    title: "Paisaje serrano",
    sectionId: "naturaleza",
    section: "Naturaleza",
    color: "#76f28a",
    icon: "leaf",
    pasted: false,
    imageLabel: "Territorio",
    description: "Las sierras permiten reconocer otra dimensión del paisaje y del partido."
  },
  {
    id: "fauna",
    number: 22,
    title: "Fauna local",
    sectionId: "naturaleza",
    section: "Naturaleza",
    color: "#76f28a",
    icon: "leaf",
    pasted: false,
    imageLabel: "Animales cercanos",
    description: "La fauna permite conectar observación, ambiente y educación."
  },
  {
    id: "flora",
    number: 23,
    title: "Flora nativa",
    sectionId: "naturaleza",
    section: "Naturaleza",
    color: "#76f28a",
    icon: "leaf",
    pasted: false,
    imageLabel: "Plantas y ambiente",
    description: "La flora nativa ayuda a pensar los ambientes y sus transformaciones."
  },
  {
    id: "lagunas",
    number: 24,
    title: "Lagunas y humedales",
    sectionId: "naturaleza",
    section: "Naturaleza",
    color: "#76f28a",
    icon: "leaf",
    pasted: false,
    imageLabel: "Agua y biodiversidad",
    description: "Los ambientes acuáticos permiten reconocer relaciones entre agua, paisaje y vida."
  },

  {
    id: "fiestas",
    number: 25,
    title: "Fiestas populares",
    sectionId: "cultura",
    section: "Cultura",
    color: "#d78bff",
    icon: "users",
    pasted: false,
    imageLabel: "Celebraciones",
    description: "Las fiestas reúnen música, encuentro, identidad y memoria compartida."
  },
  {
    id: "leyendas",
    number: 26,
    title: "Leyendas locales",
    sectionId: "cultura",
    section: "Cultura",
    color: "#d78bff",
    icon: "landmark",
    pasted: false,
    imageLabel: "Relatos que viajan",
    description: "Las leyendas cuentan el territorio desde la imaginación y la memoria oral."
  },
  {
    id: "deporte",
    number: 27,
    title: "Deporte local",
    sectionId: "cultura",
    section: "Cultura",
    color: "#d78bff",
    icon: "users",
    pasted: true,
    imageLabel: "Pasión compartida",
    description: "El deporte forma vínculos, pertenencias, recuerdos y trayectorias comunitarias."
  },
  {
    id: "musica",
    number: 28,
    title: "Música y encuentros",
    sectionId: "cultura",
    section: "Cultura",
    color: "#d78bff",
    icon: "users",
    pasted: false,
    imageLabel: "Escenas culturales",
    description: "La música y los encuentros culturales construyen memoria sensible de la ciudad."
  },
  {
    id: "cultura",
    number: 29,
    title: "Cultura que nos une",
    sectionId: "cultura",
    section: "Cultura",
    color: "#d78bff",
    icon: "users",
    pasted: true,
    imageLabel: "Fiestas y relatos",
    description: "La cultura local se construye con celebraciones, leyendas, deportes y encuentros."
  },
  {
    id: "oficios",
    number: 30,
    title: "Oficios y saberes",
    sectionId: "cultura",
    section: "Cultura",
    color: "#d78bff",
    icon: "users",
    pasted: false,
    imageLabel: "Saberes cotidianos",
    description: "Los oficios también forman parte de la cultura viva de una comunidad."
  },

  {
    id: "familias",
    number: 31,
    title: "Memorias familiares",
    sectionId: "personajes",
    section: "Personajes",
    color: "#ff9f6e",
    icon: "users",
    pasted: false,
    imageLabel: "Archivo vivo",
    description: "Las historias familiares pueden convertirse en figuritas comunitarias."
  },
  {
    id: "docentes",
    number: 32,
    title: "Docentes",
    sectionId: "personajes",
    section: "Personajes",
    color: "#ff9f6e",
    icon: "users",
    pasted: false,
    imageLabel: "Trayectorias educativas",
    description: "Las trayectorias docentes dejan huellas en generaciones y comunidades."
  },
  {
    id: "artistas",
    number: 33,
    title: "Artistas locales",
    sectionId: "personajes",
    section: "Personajes",
    color: "#ff9f6e",
    icon: "users",
    pasted: true,
    imageLabel: "Creación",
    description: "El arte permite construir identidad, memoria y sensibilidad colectiva."
  },
  {
    id: "trabajadores",
    number: 34,
    title: "Trabajadores",
    sectionId: "personajes",
    section: "Personajes",
    color: "#ff9f6e",
    icon: "users",
    pasted: false,
    imageLabel: "Oficios y esfuerzo",
    description: "Las historias del trabajo permiten reconocer procesos sociales y productivos."
  },
  {
    id: "deportistas",
    number: 35,
    title: "Deportistas",
    sectionId: "personajes",
    section: "Personajes",
    color: "#ff9f6e",
    icon: "users",
    pasted: false,
    imageLabel: "Trayectorias",
    description: "Las trayectorias deportivas también forman parte del álbum de la ciudad."
  },
  {
    id: "vecinos",
    number: 36,
    title: "Vecinos protagonistas",
    sectionId: "personajes",
    section: "Personajes",
    color: "#ff9f6e",
    icon: "users",
    pasted: false,
    imageLabel: "Comunidad",
    description: "El álbum puede crecer con historias aportadas por vecinos, escuelas e instituciones."
  }
];

export const specialIds = ["palacio", "arroyo", "cultura", "la-maxima", "puentes", "leyendas"];
