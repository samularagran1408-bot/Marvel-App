/**
 * Respuesta de la lista de Hero
 */
export interface HeroListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroResult[];
}

export interface HeroResult {
  name: string;
  url: string;
}

export interface Hero {
    id: string;                    // ID del héroe
    name: string;                  // Nombre gender
    response: string;              // "success"
    powerstats: PowerStats;        // Estadísticas
    biography: Biography;          // Biografía
    appearance: Appearance;        // Apariencia física
    work: Work;                    // Trabajo/ocupación
    connections: Connections;      // Conexiones
    image: Image;                  // URL de la imagen
}

export interface PowerStats{
    intelligence: string;          // "100"
    strength: string;              // "26"
    speed: string;                 // "27"
    durability: string;            // "50"
    power: string;                 // "47"
    combat: string;                // "100"
}

export interface Biography {
    "full-name": string; 
    "alter-egos": string;
    aliases: string[]; 
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;             // "DC Comics" o "Marvel Comics"
    alignment: string;
}

export interface Appearance {
    gender: string;                // "Male"
    race: string;                  // "Human"
    height: string[];              // ["6'2", "188 cm"]
    weight: string[];              // ["210 lb", "95 kg"]
    "eye-color": string;           // "blue"
    "hair-color": string;          // "black"
}

export interface Work {
    occupation: string;            // "Businessman"
    base: string;                  // "Batcave, Stately Wayne Manor..."
}

export interface Connections {
    "group-affiliation": string;   // "Batman Family, Justice League..."
    relatives: string;             // "Damian Wayne (son)..."
}

export interface Image {
    url: string;                   // "https://www.superherodb.com/..."
}

export interface HeroSearchResponse {
    response: string;              // "success"
    "results-for": string;         // "batman"
    results: Hero[];               // Lista de héroes
}