// Generate large lists of random names
const randomNames = Array.from({ length: 1000 }, (_, i) => `Name${i + 1}`);

// Generate large lists of random locations
const randomLocations = Array.from({ length: 1000 }, (_, i) => `City${i + 1}, State${i % 50}`);

// Generate 50,000 student profiles
const students = Array.from({ length: 50000 }, (_, i) => ({
  id: i + 1,
  name: randomNames[Math.floor(Math.random() * randomNames.length)],
  location: randomLocations[Math.floor(Math.random() * randomLocations.length)],
  interestedInYoga: Math.random() > 0.5, // Randomly assign interest
}));

const scanBtn = document.getElementById('scanBtn');
const progressBar = document.getElementById('progressBar');
const scanningArea = document.getElementById('scanningArea');
const totalProfilesElem = document.getElementById('totalProfiles');
const boostedProfilesElem = document.getElementById('boostedProfiles');
const apiKeyInput = document.getElementById('apiKey');

let currentIndex = 0;

function simulateBotScan(student) {
  // Simulate scanning output
  const profileText = `Scanning... { id: ${student.id}, name: "${student.name}", location: "${student.location}", interestedInYoga: ${student.interestedInYoga} }`;

  // Append the scan output to the scanning area
  scanningArea.textContent += `${profileText}\n`;

  // Keep the latest text in view
  scanningArea.scrollTop = scanningArea.scrollHeight;
}

function updateInsights(total, recommended) {
  totalProfilesElem.textContent = total;
  boostedProfilesElem.textContent = recommended;
}

function startScanning() {
  scanBtn.disabled = true;
  scanningArea.textContent = ''; // Clear previous scans
  progressBar.value = 0;

  let recommendedCount = 0;
  const scanDuration = 5 * 60 * 1000; // 5 minutes
  const intervalTime = scanDuration / students.length;

  const interval = setInterval(() => {
    if (currentIndex >= students.length) {
      clearInterval(interval);
      scanBtn.disabled = false;
      currentIndex = 0;
      return;
    }

    const student = students[currentIndex];
    simulateBotScan(student);

    if (student.interestedInYoga) recommendedCount++;

    currentIndex++;
    progressBar.value = (currentIndex / students.length) * 100;

    updateInsights(currentIndex, recommendedCount);
  }, intervalTime);
}

scanBtn.addEventListener('click', () => {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    alert('Please enter a valid API key.');
    return;
  }

  startScanning();
});
