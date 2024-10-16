import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Something we call Games?";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Declare a counter variable and growth variable
let Count = 0;
let growthRate = 0;

// Count variables for upgrades
let upgradesPurchased = { A: 0, B: 0, C: 0 };

// Define upgrades
const upgrades = {
  A: { cost: 10, rate: 0.1 },
  B: { cost: 100, rate: 2.0 },
  C: { cost: 1000, rate: 50.0 }
};


// Create display element
const counterDisplay = document.createElement('div');
app.appendChild(counterDisplay);
const growthRateDisplay = document.createElement('div');
app.appendChild(growthRateDisplay);
const upgradesDisplay = document.createElement('div');
app.appendChild(upgradesDisplay);

function updateDisplay() {
  counterDisplay.textContent = `Launch: ${Count.toFixed(2)} rockets`;
  growthRateDisplay.textContent = `Growth Rate: ${(growthRate * 240).toFixed(2)} rockets/sec`;
  upgradesDisplay.textContent = `Upgrades - A: ${upgradesPurchased.A}, B: ${upgradesPurchased.B}, C: ${upgradesPurchased.C}`;
}


// Create a button element
const button = document.createElement('button');

// Set the button text
button.textContent = 'Launch 🚀';

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
  const { cost, rate } = upgrades[key];
  upgradeButton.textContent = `Purchase ${key} (${rate} rockets/sec for ${cost} units)`;
  upgradeButton.disabled = Count < cost;
  upgradeButton.addEventListener('click', () => {
    if (Count >= cost) {
      Count -= cost;
      growthRate += rate / 240;
      upgradesPurchased[key]++;
      updateDisplay();
    }
  });
  app.appendChild(upgradeButton);

  return upgradeButton;
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
    const { cost } = upgrades[key as keyof typeof upgrades];
    button.disabled = Count < cost;
  });
  updateDisplay(); // Update the display
  requestAnimationFrame(animateCounter); // Schedule the next frame
}

// Start the animation
requestAnimationFrame(animateCounter);
