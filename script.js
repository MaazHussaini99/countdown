// Target date: December 17, 2025, 11:45 PM Qatar Time (UTC+3)
// Qatar uses AST (Arabia Standard Time) which is UTC+3
const targetDate = new Date('2025-12-17T23:45:00+03:00');

// Romantic messages that rotate
const loveMessages = [
    "💕 Every moment apart makes our reunion even sweeter",
    "💑 Two hearts, one love, counting down together",
    "🌟 The stars are aligning for our special moment",
    "💖 Distance is temporary, our love is forever",
    "✨ Soon we'll be writing new chapters together",
    "🌹 Love knows no distance, only the journey home",
    "💝 Each tick brings us closer to endless embraces"
];

let currentMessageIndex = 0;
let lastDayValue = null;

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    // If countdown is finished
    if (difference <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.getElementById('message').textContent = '💕❤️ TOGETHER AT LAST! ❤️💕';

        // Trigger celebration
        createCelebration();
        return;
    }

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the display with animation
    updateWithAnimation('days', days);
    updateWithAnimation('hours', hours.toString().padStart(2, '0'));
    updateWithAnimation('minutes', minutes.toString().padStart(2, '0'));
    updateWithAnimation('seconds', seconds.toString().padStart(2, '0'));

    // Show milestone messages
    checkMilestones(days, hours, minutes);

    // Update rotating love message every day change
    if (lastDayValue === null || lastDayValue !== days) {
        lastDayValue = days;
        rotateLoveMessage();
    }
}

function updateWithAnimation(elementId, value) {
    const element = document.getElementById(elementId);
    if (element.textContent !== value.toString()) {
        element.style.transform = 'scale(1.2)';
        element.textContent = value;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

function checkMilestones(days, hours, minutes) {
    const messageElement = document.getElementById('message');

    if (days === 0 && hours === 0 && minutes === 0) {
        messageElement.textContent = '⏰ FINAL COUNTDOWN! Seconds away from reunion! ⏰';
    } else if (days === 0 && hours === 0) {
        messageElement.textContent = '🎊 Less than an hour until we meet! 🎊';
    } else if (days === 0) {
        messageElement.textContent = '🎉 THE WAIT IS ALMOST OVER - Today is the day! 🎉';
    } else if (days === 1) {
        messageElement.textContent = '💫 Just ONE more day until our hearts reunite! 💫';
    } else if (days === 7) {
        messageElement.textContent = '📅 ONE WEEK LEFT! The countdown intensifies! 📅';
    } else if (days === 30) {
        messageElement.textContent = '🌙 ONE MONTH to go! Time to start counting hours! 🌙';
    }
}

function rotateLoveMessage() {
    const loveNotes = document.querySelectorAll('.love-note');
    if (loveNotes.length > 0) {
        currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
        loveNotes[0].style.opacity = '0';
        setTimeout(() => {
            loveNotes[0].textContent = loveMessages[currentMessageIndex];
            loveNotes[0].style.opacity = '0.9';
        }, 500);
    }
}

function createCelebration() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.opacity = '1';
    heart.style.transition = 'all 3s ease-out';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.top = '100vh';
        heart.style.opacity = '0';
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
    }, 100);

    setTimeout(() => {
        heart.remove();
    }, 3100);
}

// Add smooth transition to time elements
document.querySelectorAll('.time').forEach(element => {
    element.style.transition = 'transform 0.3s ease';
});

// Rotate love messages every 8 seconds
setInterval(rotateLoveMessage, 8000);

// Update countdown immediately
updateCountdown();

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add sparkle effect on hover
document.querySelectorAll('.time-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.top = '10px';
        sparkle.style.right = '10px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.animation = 'fadeIn 0.5s ease';
        box.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 500);
    });
});
