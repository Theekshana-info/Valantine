// Firebase config 
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

    
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('fade-in');
      
    
      const userName = localStorage.getItem('valentineName');
      const heading = document.getElementById('loveMessage');
      if (userName) {
        heading.innerHTML = `Woooooooo!!!  <br> Love you ${userName} ;))`;
      }
    });

    
    function createFlower() {
      const flower = document.createElement('div');
      flower.className = `flower ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
      const flowers = [ '🖤', '💖', '💙', '🌷', '❤'];
      flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
      flower.style.left = Math.random() * 100 + '%';
      flower.style.top = Math.random() * 100 + '%';
      document.body.appendChild(flower);
    }

    
    for (let i = 0; i < 20; i++) {
      createFlower();
    }

    
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
        // custom alert
        const alert = document.createElement('div');
        alert.className = 'custom-alert';
        alert.innerHTML = 'Thanks for your message! It was sent! 💌';
        document.body.appendChild(alert);
    
        // Remove the alert after animation
        setTimeout(() => {
          alert.remove();
        }, 3000);
    
        messageInput.value = '';
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        alert('Failed to submit message. Please try again.');
      });
    }
