const { v4: uuidv4 } = require('uuid');

const products = [
  {
    description: "A real-time strategy game set in a fantasy world filled with orcs, humans, and other races.",
    id: uuidv4(), // Generates a random UUID
    price: 30,
    title: "Warcraft III",
  },
  {
    description: "An action-adventure game where players control the main character, Dante, in his quest to defeat demons.",
    id: uuidv4(),
    price: 20,
    title: "Devil May Cry",
  },
  {
    description: "A sandbox game where players can build and explore their own worlds.",
    id: uuidv4(),
    price: 25,
    title: "Minecraft",
  },
  {
    description: "A first-person shooter game set in a dystopian future.",
    id: uuidv4(),
    price: 40,
    title: "Cyberpunk 2077",
  },
  {
    description: "An action-packed game set in an open world environment.",
    id: uuidv4(),
    price: 60,
    title: "Grand Theft Auto V",
  },
  {
    description: "An action RPG that combines open world exploration with strategic combat against robotic creatures and other factions in a post-apocalyptic world.",
    id: uuidv4(),
    price: 50,
    title: "Horizon Zero Dawn",
  },
];

module.exports = products;
