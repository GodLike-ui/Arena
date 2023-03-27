import { connect, play } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';

import './css/bootstrap-reboot.css';
import './css/main.css';
//loginui
const closeLogin = document.getElementById("closeLogin");
const Loginmenu = document.getElementById("loginMenu");
const showLogin = document.getElementById("loginBtn");

//Signupui
const closeSignup = document.getElementById("closeSignup");
const singupmenu = document.getElementById("signupMenu");
const showSignup = document.getElementById("signupBtn");
//databse
var susername, spassword;

// Signup form submit event listener
document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault(); // prevent default form submission behavior
  // get input values
  susername = document.getElementById("susername").value;
  spassword = document.getElementById("spassword").value;
  // clear form inputs
  document.getElementById("signup-form").reset();
  // hide signup menu
  document.getElementById("signupMenu").style.display = "none";
});

// Login form submit event listener
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault(); // prevent default form submission behavior
  // get input values
  var lusername = document.getElementById("lusername").value;
  var lpassword = document.getElementById("lpassword").value;
  // clear form inputs
  document.getElementById("login-form").reset();
  // check if input values match signup variables
  if (lusername === susername && lpassword === spassword) {
    alert("Login successful!");
    // hide login menu
    document.getElementById("loginMenu").style.display = "none";
  } else {
    alert("Invalid username or password. Please try again.");
  }
});
// hide login
closeLogin.addEventListener("click", function() {
  Loginmenu.style.display = "none";
});
// show login
showLogin.addEventListener("click", function() {
  Loginmenu.style.display = "block";
});

// hide sign-up
closeSignup.addEventListener("click", function() {
  singupmenu.style.display = "none";
});
// show sign-up
showSignup.addEventListener("click", function() {
  singupmenu.style.display = "block";
});


const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput = document.getElementById('username-input');
const playerCountDiv = document.getElementById('playercount');
const stats = document.getElementById('stats')
const canvas = document.getElementById('game-canvas')
const stars = document.getElementById('star-group')
 // get the player count div

Promise.all([
  connect(onGameOver),
  downloadAssets(),
]).then(() => {
  playMenu.classList.remove('hidden');
  playercount.classList.remove('hidden');
  usernameInput.focus();
  playButton.onclick = () => {
    play(usernameInput.value);
    playMenu.classList.add('hidden');
    playercount.classList.add('hidden');
    showSignup.classList.add('hidden');
    showLogin.classList.add('hidden');
    stats.classList.add('hidden')
    canvas.classList.remove('hidden')
    canvas.classList.add('show')
    stars.classList.add('hidden')
    initState();
    startCapturingInput();
    startRendering();
    setLeaderboardHidden(false);
  };
}).catch(console.error);

function onGameOver() {
  stopCapturingInput();
  stopRendering();
  playMenu.classList.remove('hidden');
  playercount.classList.remove('hidden');
  canvas.classList.add('hidden')
  stars.classList.remove('hidden')
  
  setLeaderboardHidden(true);
}

// Update player count when received from the server
export const updatePlayerCount = count => {
  console.log(`Received playerCount event with count: ${count}`);
  playerCountDiv.innerText = `Players in game: ${count}`;
}




// Listen for player count updates from the server
