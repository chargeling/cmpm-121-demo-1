import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Arms Co";
document.title = gameName;

// Initialize elements
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Game state variables
let count = 0;
let growthRate = 0;

// Available items for purchase
const availableItems = [
  { name: "Bullet man", initialCost: 10, rate: 0.1, currentCost: 10, count: 0 },
  { name: "Crafting Machine with Worker", initialCost: 100, rate: 2.0, currentCost: 100, count: 0 },
  { name: "Production line", initialCost: 1000, rate: 40.0, currentCost: 1000, count: 0 },
  { name: "High precision Assembly line", initialCost: 12500, rate: 700.0, currentCost: 12500, count: 0 },
  { name: "Highly Intelligent Mechanical Control Assembly Line", initialCost: 100000, rate: 9000.0, currentCost: 100000, count: 0 }
];

const priceMultiplier = 1.15;

// Display elements
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");
const upgradesDisplay = document.createElement("div");

app.append(counterDisplay, growthRateDisplay, upgradesDisplay);

function updateDisplay() {
  counterDisplay.textContent = `Make: ${count.toFixed(2)} Bullets`;
  growthRateDisplay.textContent = `Craft Rate: ${(growthRate * 240).toFixed(2)} Bullets`;
  upgradesDisplay.textContent = availableItems.map(item => `${item.name}: ${item.count}`).join(", ");
}

function initializeCraftButton() {
  const craftButton = document.createElement("button");
  craftButton.textContent = 'Crafts a Bullet';
  craftButton.addEventListener('click', handleCraft);
  document.body.appendChild(craftButton);
}

function handleCraft() {
  count++;
  updateDisplay();
}

function initializeUpgradeButtons() {
  availableItems.forEach(item => {
    const upgradeButton = createUpgradeButton(item);
    app.appendChild(upgradeButton);
  });
}

function createUpgradeButton(item: any): HTMLButtonElement {
  const button = document.createElement('button');
  updateUpgradeButtonText(button, item);
  
  button.addEventListener('click', () => handleUpgrade(item, button));
  return button;
}

function handleUpgrade(item: any, button: HTMLButtonElement) {
  if (count >= item.currentCost) {
    count -= item.currentCost;
    growthRate += item.rate / 240;
    item.currentCost *= priceMultiplier;
    item.count++;
    updateUpgradeButtonText(button, item);
    updateDisplay();
  }
}

function updateUpgradeButtonText(button: HTMLButtonElement, item: any) {
  button.textContent = `Purchase ${item.name} make (${item.rate} bullets/sec for ${item.currentCost.toFixed(2)} units)`;
}

function animateCounter() {
  count += growthRate;
  updateDisplay();
  requestAnimationFrame(animateCounter);
}

function initializeGame() {
  updateDisplay();
  initializeCraftButton();
  initializeUpgradeButtons();
  requestAnimationFrame(animateCounter);
}

// Initialize the game
initializeGame();