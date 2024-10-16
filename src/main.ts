import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Something we call Games?";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Declare a counter variable
let Count = 0;

// Create a counter display element
const counterDisplay = document.createElement('div');
counterDisplay.textContent = `Launch: ${Count} rockets`;
app.appendChild(counterDisplay);

function updateDisplay() {
  counterDisplay.textContent = `Launch: ${Count} rockets`;
}


// Create a button element
const button = document.createElement('button');

// Set the button text
button.textContent = 'Launch 🚀';

// Add an event listener (optional, but usually useful!)
button.addEventListener('click', () => {
    Count++; // Increment counter
    updateDisplay(); // Update the display
    console.log('Button was clicked!');
    alert('Button was clicked!');
  });
  
// Append the button to the body or another element
document.body.appendChild(button);

// Use setInterval to automatically increment the counter every second
setInterval(() => {
  Count++; // Increment counter
  updateDisplay(); // Update the display
}, 1000); // 1000 milliseconds = 1 second

