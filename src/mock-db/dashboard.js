// dashboard schema

export const chartData = [
  { month: "January", clothes: 286, cosmetics: 180 },
  { month: "February", clothes: 305, cosmetics: 100 },
  { month: "March", clothes: 237, cosmetics: 120 },
  { month: "April", clothes: 173, cosmetics: 90 },
  { month: "May", clothes: 209, cosmetics: 130 },
  { month: "June", clothes: 214, cosmetics: 140 },
];

export const chartConfig = {
  clothes: {
    label: "Clothes",
    color: "#A71B79",
  },
  cosmetics: {
    label: "Cosmetics",
    color: "#E0C013",
  },
};

export const chartData2 = [
  { browser: "collection1", collections: 275, fill: "var(--color-collection1)" },
  { browser: "collection2", collections: 200, fill: "var(--color-collection2)" },
  { browser: "collection3", collections: 187, fill: "var(--color-collection3)" },
  { browser: "collection4", collections: 173, fill: "var(--color-collection4)" },
  { browser: "collection5", collections: 90, fill: "var(--color-collection5)" },
  { browser: "collection6", collections: 45, fill: "var(--color-collection6)" },
  { browser: "collection7", collections: 45, fill: "var(--color-collection7)" },
];

export const chartConfig2 = {
  collections: {
    label: "Collections",
  },
  collection1: {
    label: "collection1",
    color: "var(--chart-1)",
  },
  collection2: {
    label: "collection2",
    color: "#5AC8DA",
  },
  collection3: {
    label: "collection3",
    color: "#A71B79",
  },
  collection4: {
    label: "collection4",
    color: "#E0C013",
  },
  collection5: {
    label: "collection5",
    color: "var(--chart-2)",
  },
   collection6: {
    label: "collection6",
    color: "var(--chart-3)",
  },
   collection7: {
    label: "collection7",
    color: "var(--chart-4)",
  },
};
