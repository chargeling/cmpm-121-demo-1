import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Something we call Games?";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


// Create a button element
const button = document.createElement('button');

// Set the button text
button.textContent = 'Launch 🚀';

// Add an event listener (optional, but usually useful!)
button.addEventListener('click', () => {
    console.log('Button was clicked!');
    alert('Button was clicked!');
  });
  
  // Append the button to the body or another element
  document.body.appendChild(button);