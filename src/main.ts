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

// Create a counter display element
const counterDisplay = document.createElement('div');
counterDisplay.textContent = `Launch: ${Count.toFixed(2)} rockets`;
app.appendChild(counterDisplay);

function updateDisplay() {
  counterDisplay.textContent = `Launch: ${Count.toFixed(2)} rockets`;
}


// Create a button element
const button = document.createElement('button');

// Set the button text
button.textContent = 'Launch 🚀';

// Add an event listener (optional, but usually useful!)
button.addEventListener('click', () => {
    Count++; // Increment counter
    updateDisplay(); // Update the display
    console.log('Rocket was launched!');
    alert('Rocket was launched!');
  });
  
// Append the button to the body or another element
document.body.appendChild(button);

// Create the upgrade button
const upgradeButton = document.createElement('button');
upgradeButton.textContent = 'Purchase Upgrade (+1 growth rate)';
upgradeButton.disabled = true;
upgradeButton.addEventListener('click', () => {
  if (Count >= 10) { // Check if user can afford the upgrade
    Count -= 10; // Deduct cost
    growthRate += 1 / 240; // Increase growth rate
    updateDisplay();
  }
});
app.appendChild(upgradeButton);


// Function for animation frame updates
function animateCounter() {
  Count += growthRate; // Increment by a fraction per frame
  upgradeButton.disabled = Count < 10; // Disable the upgrade button if can't afford
  updateDisplay(); // Update the display
  requestAnimationFrame(animateCounter); // Schedule the next frame
}

// Start the animation
requestAnimationFrame(animateCounter);
