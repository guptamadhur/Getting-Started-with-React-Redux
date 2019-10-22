const products = [
  {
    id: 1,
    name: "carrot ooty",
    slug: "carrot-ooty",
    unit: "kilograms",
    price: "50",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 2,
    name: "Onion",
    slug: "onion",
    unit: "kilogram",
    price: "55",
    image: "../src/assets/onion.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 3,
    name: "Lemon",
    slug: "lemon",
    unit: 1,
    price: "24",
    image: "../src/assets/lemon.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 4,
    name: "Tomato Hybrid",
    slug: "tomato-hybrid",
    unit: "kilograms",
    price: "65",
    image: "../src/assets/tomato-hybrid.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 5,
    name: "Building Applications with React and Redux",
    slug: "react-redux-react-router-es6",
    unit: 1,
    price: "JavaScript",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 6,
    name: "Building Applications in React and Flux",
    slug: "react-flux-building-applications",
    unit: 1,
    price: "JavaScript",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 7,
    name: "Clean Code: Writing Code for Humans",
    slug: "writing-clean-code-humans",
    unit: 1,
    price: "Software Practices",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 8,
    name: "Architecting Applications for the Real World",
    slug: "architecting-applications-dotnet",
    unit: 1,
    price: "Software Architecture",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 9,
    name: "Becoming an Outlier: Reprogramming the Developer Mind",
    slug: "career-reboot-for-developer-mind",
    unit: 1,
    price: "Career",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  },
  {
    id: 10,
    name: "Web Component Fundamentals",
    slug: "web-components-shadow-dom",
    unit: 1,
    price: "HTML5",
    image: "../src/assets/carrot-ooty.jpg",
    description: "",
    quantity: 0
  }
];

const newProduct = {
  id: null,
  name: "",
  unit: "",
  price: "",
  image: "",
  description: "",
  quantity: 0
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newProduct,
  products
};
