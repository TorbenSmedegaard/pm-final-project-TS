// Editorial Spotlight collection (FR2 / safety guard): the ONLY source of Spotlight titles.
// Static mock content is permitted for the prototype. No generated or algorithmic entries here.
export const SPOTLIGHT_COLLECTION = [
  {
    id: "sp-01",
    title: "The Quiet Cartographer",
    year: 2023,
    runtime: "1h 48m",
    genre: "Drama",
    hiddenGem: true,
    tone: "#2f5d63",
    synopsis:
      "A mapmaker returning to her flooded hometown redraws the coastline and, with it, the story her family agreed to forget.",
  },
  {
    id: "sp-02",
    title: "Night Shift Radio",
    year: 2022,
    runtime: "6 episodes",
    genre: "Mystery",
    hiddenGem: false,
    tone: "#3c4a7a",
    synopsis:
      "An overnight call-in host starts receiving confessions about a crime that has not happened yet.",
  },
  {
    id: "sp-03",
    title: "Salt & Iron",
    year: 2021,
    runtime: "2h 04m",
    genre: "Historical",
    hiddenGem: true,
    tone: "#6b4638",
    synopsis:
      "Two rival blacksmiths in a shipbuilding town discover their families were bound by a single forged signature.",
  },
  {
    id: "sp-04",
    title: "Perennial",
    year: 2024,
    runtime: "1h 32m",
    genre: "Documentary",
    hiddenGem: false,
    tone: "#3f6b46",
    synopsis:
      "Four seed keepers across three continents protect crops that the commercial market decided were not worth saving.",
  },
  {
    id: "sp-05",
    title: "Lowlight",
    year: 2023,
    runtime: "8 episodes",
    genre: "Thriller",
    hiddenGem: false,
    tone: "#2b3a4a",
    synopsis:
      "A forensic photographer realises every crime scene she has shot this year shares the same background detail.",
  },
  {
    id: "sp-06",
    title: "Bellwether Street",
    year: 2020,
    runtime: "1h 55m",
    genre: "Comedy",
    hiddenGem: true,
    tone: "#7a5a2e",
    synopsis:
      "The most statistically average street in the country becomes the unwilling test market for everything.",
  },
  {
    id: "sp-07",
    title: "Hollow Frequency",
    year: 2022,
    runtime: "1h 41m",
    genre: "Sci-Fi",
    hiddenGem: false,
    tone: "#4a3a6b",
    synopsis:
      "A decommissioned listening station picks up a broadcast that answers questions before they are asked.",
  },
  {
    id: "sp-08",
    title: "Tidewater Kitchen",
    year: 2024,
    runtime: "10 episodes",
    genre: "Food",
    hiddenGem: false,
    tone: "#35635c",
    synopsis:
      "A coastal cook travels upriver collecting the recipes that migration, not cookbooks, carried inland.",
  },
  {
    id: "sp-09",
    title: "Second Language",
    year: 2021,
    runtime: "1h 37m",
    genre: "Romance",
    hiddenGem: true,
    tone: "#6b3a4f",
    synopsis:
      "Two translators fall for each other in a third language neither of them speaks well enough to lie in.",
  },
  {
    id: "sp-10",
    title: "The Long Count",
    year: 2019,
    runtime: "2h 12m",
    genre: "Sports",
    hiddenGem: false,
    tone: "#5a4a2e",
    synopsis:
      "A boxing referee retires after one disputed decision, then spends a decade recounting the same nine seconds.",
  },
  {
    id: "sp-11",
    title: "Glasshouse Rules",
    year: 2023,
    runtime: "6 episodes",
    genre: "Drama",
    hiddenGem: false,
    tone: "#3a5a4a",
    synopsis:
      "A botanical institute's new director inherits a staff that has quietly run the place without a director for years.",
  },
  {
    id: "sp-12",
    title: "Northbound Signal",
    year: 2024,
    runtime: "1h 29m",
    genre: "Adventure",
    hiddenGem: true,
    tone: "#2e4f6b",
    synopsis:
      "A rail engineer walks the length of an abandoned line to find out why the last train never reported in.",
  },
  {
    id: "sp-13",
    title: "Paper Museums",
    year: 2022,
    runtime: "1h 24m",
    genre: "Documentary",
    hiddenGem: false,
    tone: "#5a3a3a",
    synopsis:
      "Archivists race a humidity problem to save the only surviving records of a city that was rebuilt twice.",
  },
  {
    id: "sp-14",
    title: "Understudy",
    year: 2020,
    runtime: "1h 58m",
    genre: "Drama",
    hiddenGem: false,
    tone: "#46466b",
    synopsis:
      "An understudy finally goes on, and discovers the role was written about someone she used to know.",
  },
];

// Standard algorithmic rails, used as contrast so Spotlight reads as visually distinct (FR4).
export const ALGORITHMIC_RAILS = [
  {
    id: "rail-continue",
    label: "Continue Watching",
    source: "algorithmic",
    titles: [
      "Harbor Lines",
      "Ashfall County",
      "The Ninth Table",
      "Meridian Drift",
      "Static Garden",
      "Cold Open",
    ],
  },
  {
    id: "rail-because",
    label: "Because you watched Meridian Drift",
    source: "algorithmic",
    titles: [
      "Meridian Drift: Origins",
      "Drift Season 2",
      "Meridian Shorts",
      "More Like Drift",
      "Drift Unscripted",
      "Meridian Reunion",
    ],
  },
  {
    id: "rail-trending",
    label: "Trending Now",
    source: "algorithmic",
    titles: [
      "Cliffside",
      "The Rerun",
      "Eleven Hours",
      "Loud Neighbors",
      "Same River Twice",
      "Peak Season",
    ],
  },
];
