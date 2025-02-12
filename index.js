

  // Your Firebase config (replace with your actual config)
  const firebaseConfig = {
    apiKey: "AIzaSyAL39oiv3ajje0CyxhPr05pDjwGpWGfTlA",
    authDomain: "tine-3badd.firebaseapp.com",
    projectId: "tine-3badd",
    storageBucket: "tine-3badd.firebasestorage.app",
    messagingSenderId: "1008720063324",
    appId: "1:1008720063324:web:d31ba77d25b63642506f99"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();







  const nameOverlay = document.getElementById('nameOverlay');
  const nameInput = document.getElementById('nameInput');
  const submitName = document.getElementById('submitName');
  const namePlaceholder = document.getElementById('namePlaceholder');

  submitName.addEventListener('click', function() {
const userName = nameInput.value.trim();
if (userName === '') {
  alert('Plz add a name');
  return;
}

// Save to localStorage
namePlaceholder.textContent = userName;
localStorage.setItem('valentineName', userName);

// Send to Firebase
db.collection("valentineData").add({
  type: "nameSubmission",
  name: userName,
  timestamp: firebase.firestore.FieldValue.serverTimestamp()
})
.catch((error) => {
  console.error("Error writing document: ", error);
});

nameOverlay.style.display = 'none';
nameInput.value = '';
});

  let yesClickCount = 0;
  let noClickCount = 0;

  const noTexts = [
    "Are you sure?",
    "Don't say so!",
    "Think it again!",
    "Really?!",
    "Give it a chance!",
    "You might regret this!",
    "Last chance!",
    "Think about us!",
    "Is that your final answer?"
  ];

  const yesTexts = [
    "Seriously?",
    "Are you real?",
    "You made my day!"
  ];

  function shrinkNoButton() {
    noClickCount++;
    const no = document.getElementById('no');

    if (noClickCount < 10) {
      let scale = 1 - (noClickCount * 0.1);
      no.style.transform = `scale(${scale})`;
    } else {
      no.style.display = 'none';
    }

    const randomIndex = Math.floor(Math.random() * noTexts.length);
    no.querySelector('.message').textContent = noTexts[randomIndex];
    increaseYesButton();
  }

  function increaseYesButton() {
    const yes = document.getElementById('yes');
    let currentSize = parseFloat(window.getComputedStyle(yes).fontSize);
    yes.style.fontSize = (currentSize + 3) + 'px';
    yes.style.padding = `${(currentSize + 2)}px ${(currentSize + 3)}px`;
  }

  function changeYesText() {
    const yes = document.getElementById('yes');
    if (yesClickCount < yesTexts.length) {
      yes.querySelector('.message').textContent = yesTexts[yesClickCount];
      yesClickCount++;
    } else {
      const userName = localStorage.getItem('valentineName') || 'pookie';
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = `love.html?name=${encodeURIComponent(userName)}`;
      }, 200);
    }
  }

  function createFlower() {
    const flower = document.createElement('div');
    flower.className = `flower ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
    const flowers = ['🖤', '💖', '💙', '🌷',];
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.style.left = Math.random() * 100 + '%';
    flower.style.top = Math.random() * 100 + '%';
    document.body.appendChild(flower);
  }

  for (let i = 0; i < 20; i++) {
    createFlower();
  }
