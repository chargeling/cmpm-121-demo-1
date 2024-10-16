import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Arms Co";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Declare a counter variable and growth variable
let Count = 0;
let growthRate = 0;

// Available items defined in an array
const availableItems = [
  { name: "Bullet man", initialCost: 10, rate: 0.1, currentCost: 10, count: 0 },
  { name: "Crafting Machine with Worker", initialCost: 100, rate: 2.0, currentCost: 100, count: 0 },
  { name: "Production line", initialCost: 1000, rate: 40.0, currentCost: 1000, count: 0 },
  { name: "High precision Assembly line", initialCost: 12500, rate: 700.0, currentCost: 12500, count: 0 },
  { name: "Highly Intelligent Mechanical Control Assembly Line", initialCost: 100000, rate: 9000.0, currentCost: 100000, count: 0 }
];


// Multiplier for price increase
const priceMultiplier = 1.15;

// Create display element
const counterDisplay = document.createElement('div');
app.appendChild(counterDisplay);
const growthRateDisplay = document.createElement('div');
app.appendChild(growthRateDisplay);
const upgradesDisplay = document.createElement('div');
app.appendChild(upgradesDisplay);

function updateDisplay() {
  counterDisplay.textContent = `Make: ${Count.toFixed(2)} Bullets`;
  growthRateDisplay.textContent = `Craft Rate: ${(growthRate * 240).toFixed(2)} Bullets`;
  upgradesDisplay.textContent = availableItems.map(item => `${item.name}: ${item.count}`).join(", ");
}
updateDisplay();


// Create a button element
const craftButton = document.createElement('button');

// Set the button text
craftButton.textContent = 'Crafts a Bullet';

// Add an event listener (optional, but usually useful!)
craftButton.addEventListener('click', () => {
    Count++; // Increment counter
    updateDisplay(); // Update the display
  });
  
// Append the button to the body or another element
document.body.appendChild(craftButton);

// Create upgrade buttons using availableItems array
availableItems.forEach(item => {
  const upgradeButton = document.createElement('button');
  upgradeButton.textContent = `Purchase ${item.name} (${item.rate} rockets/sec for ${item.currentCost} units)`;
  app.appendChild(upgradeButton);
  
  upgradeButton.addEventListener('click', () => {
    if (Count >= item.currentCost) {
      Count -= item.currentCost;
      growthRate += item.rate / 240;
      item.currentCost *= priceMultiplier;
      item.count++;
      updateUpgradeButtonText(upgradeButton, item);
      updateDisplay();
    }
  });

});

// Update button text to reflect current cost
function updateUpgradeButtonText(button: HTMLButtonElement, item: any) {
  button.textContent = `Purchase ${item.name} (${item.rate} rockets/sec for ${item.currentCost.toFixed(2)} units)`;
}



// Function for animation frame updates
function animateCounter() {
  Count += growthRate; // Increment by a fraction per frame
  
  craftButton.disabled = false;
  updateDisplay(); // Update the display
  requestAnimationFrame(animateCounter); // Schedule the next frame
}

// Start the animation
requestAnimationFrame(animateCounter);
