// Target date: December 17, 2025, 11:45 PM Qatar Time (UTC+3)
// Qatar uses AST (Arabia Standard Time) which is UTC+3
const targetDate = new Date('2025-12-17T23:45:00+03:00');

// Flight times in their respective timezones
const myFlightDate = new Date('2025-12-16T16:55:00-06:00'); // Dec 16, 4:55 PM Dallas time (CST, UTC-6)
const herFlightDate = new Date('2025-12-17T22:10:00+05:30'); // Dec 17, 10:10 PM Mumbai time (IST, UTC+5:30)

// Romantic messages that rotate
const loveMessages = [
    "Every moment apart makes our reunion even sweeter",
    "Two hearts, one love, counting down together",
    "The stars are aligning for our special moment",
    "Distance is temporary, our love is forever",
    "Soon we'll be writing new chapters together",
    "Love knows no distance, only the journey home",
    "Each tick brings us closer to endless embraces"
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
        document.getElementById('message').textContent = 'Together at last ❤️';

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

function updateFlightCountdown(flightDate, daysId, hoursId, minsId) {
    const now = new Date();
    const difference = flightDate - now;

    if (difference <= 0) {
        document.getElementById(daysId).textContent = '0';
        document.getElementById(hoursId).textContent = '0';
        document.getElementById(minsId).textContent = '0';
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    updateWithAnimation(daysId, days);
    updateWithAnimation(hoursId, hours);
    updateWithAnimation(minsId, minutes);
}

function updateFlightCountdowns() {
    updateFlightCountdown(myFlightDate, 'my-days', 'my-hours', 'my-mins');
    updateFlightCountdown(herFlightDate, 'her-days', 'her-hours', 'her-mins');
}

function checkMilestones(days, hours, minutes) {
    const messageElement = document.getElementById('message');

    if (days === 0 && hours === 0 && minutes === 0) {
        messageElement.textContent = 'Final seconds... Almost there!';
    } else if (days === 0 && hours === 0) {
        messageElement.textContent = 'Less than an hour until we meet';
    } else if (days === 0) {
        messageElement.textContent = 'Today is the day! ✨';
    } else if (days === 1) {
        messageElement.textContent = 'Just one more day until our hearts reunite';
    } else if (days === 7) {
        messageElement.textContent = 'One week remaining';
    } else if (days === 30) {
        messageElement.textContent = 'One month to go';
    }
}

function rotateLoveMessage() {
    const loveNotes = document.querySelectorAll('.love-note');
    if (loveNotes.length > 0) {
        currentMessageIndex = (currentMessageIndex + 1) % loveMessages.length;
        loveNotes[0].style.opacity = '0';
        setTimeout(() => {
            loveNotes[0].textContent = loveMessages[currentMessageIndex];
            loveNotes[0].style.opacity = '0.82';
        }, 400);
    }
}

function createCelebration() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 10);
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
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Add smooth transition to mini time elements
document.querySelectorAll('.mini-time').forEach(element => {
    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Rotate love messages every 10 seconds
setInterval(rotateLoveMessage, 10000);

// Update countdown immediately
updateCountdown();
updateFlightCountdowns();

// Update countdown every second
setInterval(updateCountdown, 1000);
setInterval(updateFlightCountdowns, 1000);
