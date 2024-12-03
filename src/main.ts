import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Arms Co";
document.title = gameName;

// Initialize elements
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Game state variables
let count = 0; // Tracks number of bullets produced
let growthRate = 0; // Rate at which bullets auto-increase

// Available items for purchase
const availableItems = [
  { name: "Bullet man", initialCost: 10, rate: 0.1, currentCost: 10, count: 0, description: "Hire a bullet man for handcrafting with tools" },
  { name: "Crafting Machine with Worker", initialCost: 100, rate: 2.0, currentCost: 100, count: 0, description: "A machine that helps the worker creating much faster each time. " },
  { name: "Production line", initialCost: 1000, rate: 40.0, currentCost: 1000, count: 0, description: "A production line with multiple worker and everyone only focusing on one job and speed increase significantly" },
  { name: "High precision Assembly line", initialCost: 12500, rate: 700.0, currentCost: 12500, count: 0, description: "This big machine help you with the factory that a few people are controling each part of machine and creating hundreds of bullets in one time." },
  { name: "Highly Intelligent Mechanical Control Assembly Line", initialCost: 100000, rate: 9000.0, currentCost: 100000, count: 0, description: "Manpower is't need anymore, now in the factory, the giant robot are making countless of bullets in one time and you just have to sold them, power of technology." }
];

const priceMultiplier = 1.15; // Determines cost increase after each upgrade purchase

// Create display elements
const counterDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("div");
const upgradesDisplay = document.createElement("div");

// Append displays to the app container
app.append(counterDisplay, growthRateDisplay, upgradesDisplay);

/**
 * Updates the visual bullet count, crafting rate, and upgrades count
 */
function updateDisplay() {
  counterDisplay.textContent = `Make: ${count.toFixed(2)} Bullets`; // Displays current bullet count
  growthRateDisplay.textContent = `Craft Rate: ${(growthRate * 240).toFixed(2)} Bullets`; // Converts growth rate to per-minute basis and displays
  upgradesDisplay.textContent = availableItems.map(item => `${item.name}: ${item.count}`).join(", "); // Lists all upgrades owned with counts
}

/**
 * Initializes the button responsible for manually crafting bullets
 */
function initializeCraftButton() {
  const craftButton = document.createElement("button");
  craftButton.textContent = 'Crafts a Bullet'; // Button label
  craftButton.addEventListener('click', handleCraft); // Call handleCraft on click
  document.body.appendChild(craftButton); // Add button to the document
}

/**
 * Increases bullet count by one when craft button is clicked 
 */
function handleCraft() {
  count++; // Manual increment of bullet count
  updateDisplay(); // Refresh the display after change
}

/**
 * Initializes buttons for each item that can be upgraded
 */
function initializeUpgradeButtons() {
  availableItems.forEach(item => {
    const upgradeContainer = createUpgradeButton(item);
    app.appendChild(upgradeContainer); // Append each new container to the app container
  });
}

/**
 * Creates an upgrade button for a given item
 * @param item The upgrade item to create a button for
 * @returns The constructed container element with button and description
 */
function createUpgradeButton(item: any): HTMLDivElement {
  const container = document.createElement('div');
  const button = document.createElement('button');
  const description = document.createElement('p');

  updateUpgradeButtonText(button, item); // Set initial button text
  description.textContent = item.description; // Use the description from the item

  button.addEventListener('click', () => handleUpgrade(item, button)); // Handle upgrades on click

  container.appendChild(button);
  container.appendChild(description);

  return container;
}

/**
 * Handles the logic when an upgrade button is clicked
 * @param item The upgrade item being purchased
 * @param button The button element for the upgrade item
 */
function handleUpgrade(item: any, button: HTMLButtonElement) {
  if (count >= item.currentCost) { // Check if enough bullets for the upgrade
    count -= item.currentCost; // Deduct the cost from total count
    growthRate += item.rate / 240; // Increment the growth rate
    item.currentCost *= priceMultiplier; // Increase the item's cost
    item.count++; // Track how many of this item has been purchased
    updateUpgradeButtonText(button, item); // Update button label
    updateDisplay(); // Refresh the display
  }
}

/**
 * Updates the button text to reflect current upgrade details
 * @param button The button element to update
 * @param item The upgrade item type associated with the button
 */
function updateUpgradeButtonText(button: HTMLButtonElement, item: any) {
  button.textContent = `Purchase ${item.name} (${item.rate} bullets/sec for ${item.currentCost.toFixed(2)} units)`; // Set button text with item details
}

/**
 * Continuously updates the bullet count based on the current growth rate
 */
function animateCounter() {
  count += growthRate; // Add auto-generated bullets
  updateDisplay(); // Refresh the display
  requestAnimationFrame(animateCounter); // Recursively call to keep the animation loop running
}

/**
 * Initializes the game by setting up UI elements and starting the loop
 */
function initializeGame() {
  updateDisplay(); // Initial display update
  initializeCraftButton(); // Create manual crafting button
  initializeUpgradeButtons(); // Set up upgrade buttons
  requestAnimationFrame(animateCounter); // Start the growth animation loop
}

// Initialize the game
initializeGame();