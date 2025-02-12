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


    // Add event listener to prevent back navigation
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      return e.returnValue = 'You are not allowed to back. Try restarting the entire website.';
    });

    // Disable back button functionality
    window.history.forward();
    window.onbeforeunload = function() {
      return "You are not allowed to back. Try restarting the entire website.";
    }

    // When the page content is loaded, add the fade-in class
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('fade-in');
      
      // Retrieve the stored name from localStorage and update the heading
      const userName = localStorage.getItem('valentineName');
      const heading = document.getElementById('loveMessage');
      if (userName) {
        heading.innerHTML = `Woooooooo!!!  <br> Love you ${userName} ;))`;
      }
    });

    // Function to create floating flower emojis
    function createFlower() {
      const flower = document.createElement('div');
      flower.className = `flower ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
      const flowers = [ '🖤', '💖', '💙', '🌷', '❤'];
      flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
      flower.style.left = Math.random() * 100 + '%';
      flower.style.top = Math.random() * 100 + '%';
      document.body.appendChild(flower);
    }

    // Create 25 floating flowers
    for (let i = 0; i < 20; i++) {
      createFlower();
    }

    // Function to handle message submission
    function submitMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  const userName = localStorage.getItem('valentineName') || 'Anonymous';

  if (message === '') {
    alert('Please type something to send.');
    return;
  }

  // Send to Firebase
  db.collection("valentineData").add({
    type: "ideaSubmission",
    name: userName,
    idea: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      alert('Thank you for your message!');
      document.body.classList.remove('fade-out');
      messageInput.value = '';
    }, 200);
  })
  .catch((error) => {
    console.error("Error writing document: ", error);
    alert('Failed to submit message. Please try again.');
  });
}