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

// Count variables for upgrades
let upgradesPurchased = { A: 0, B: 0, C: 0 };
// Multiplier for price increase
const priceMultiplier = 1.15;

// Define upgrades
const upgrades = {
  A: { initialCost: 10, rate: 0.1, currentCost: 10 },
  B: { initialCost: 100, rate: 2.0, currentCost: 100 },
  C: { initialCost: 1000, rate: 50.0, currentCost: 1000 }
};


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
  upgradesDisplay.textContent = `Upgrades - A: ${upgradesPurchased.A}, B: ${upgradesPurchased.B}, C: ${upgradesPurchased.C}`;
}


// Create a button element
const button = document.createElement('button');

// Set the button text
button.textContent = 'Crafts a Bullet';

// Add an event listener (optional, but usually useful!)
button.addEventListener('click', () => {
    Count++; // Increment counter
    updateDisplay(); // Update the display
  });
  
// Append the button to the body or another element
document.body.appendChild(button);

// Create upgrade buttons
function createUpgradeButton(key: keyof typeof upgrades) {
  const upgradeButton = document.createElement('button');
  const { rate } = upgrades[key];
  updateUpgradeButtonText(upgradeButton, key);

  upgradeButton.addEventListener('click', () => {
    const { currentCost } = upgrades[key];
    if (Count >= currentCost) {
      Count -= currentCost;
      growthRate += rate / 240;
      upgradesPurchased[key]++;
      upgrades[key].currentCost *= priceMultiplier; // Increase cost
      updateUpgradeButtonText(upgradeButton, key);
      updateDisplay();
    }
  });
  app.appendChild(upgradeButton);

  return upgradeButton;
}

// Update button text to reflect current cost
function updateUpgradeButtonText(button: HTMLButtonElement, key: keyof typeof upgrades) {
  const { rate, currentCost } = upgrades[key];
  button.textContent = `Purchase Machine ${key} (${rate} Bullets/sec for ${currentCost.toFixed(2)} Bullets)`;
}
// Append the upgrade buttons to the app
const upgradeButtons = {
  A: createUpgradeButton('A'),
  B: createUpgradeButton('B'),
  C: createUpgradeButton('C')
};



// Function for animation frame updates
function animateCounter() {
  Count += growthRate; // Increment by a fraction per frame
  Object.entries(upgradeButtons).forEach(([key, button]) => {
    const { currentCost } = upgrades[key as keyof typeof upgrades];
    button.disabled = Count < currentCost;
  });
  updateDisplay(); // Update the display
  requestAnimationFrame(animateCounter); // Schedule the next frame
}

// Start the animation
requestAnimationFrame(animateCounter);
