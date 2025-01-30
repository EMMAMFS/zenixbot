// Real names
const realNames = [
 "Emma", "Liam", "Olivia", "Noah", "Sophia", "Mason", "Isabella", "Logan", "Ava", "Lucas",
  "Mia", "Ethan", "Charlotte", "James", "Amelia", "Aiden", "Harper", "Sebastian", "Evelyn", 
  "Alexander", "Elijah", "Abigail", "William", "Emily", "Matthew", "Elizabeth", "Benjamin", 
  "Scarlett", "Henry", "Sofia", "Jackson", "Aria", "Michael", "Chloe", "Daniel", "Grace", 
  "Carter", "Ella", "Wyatt", "Madison", "Julian", "Lily", "David", "Aubrey", "Gabriel", "Zoey", 
  "Jayden", "Penelope", "Owen", "Hannah", "Levi", "Nora", "Caleb", "Lillian", "Isaiah", "Addison", 
  "John", "Layla", "Nathan", "Zoe", "Luke", "Audrey", "Ryan", "Ellie", "Anthony", "Stella", "Dylan", 
  "Natalie", "Samuel", "Paisley", "Sebastian", "Hazel", "Christian", "Aurora", "Hunter", "Brooklyn", 
  "Jack", "Violet", "Levi", "Claire", "Aaron", "Savannah", "Thomas", "Skylar", "Adrian", "Lucy", 
  "Christopher", "Anna", "Andrew", "Genesis", "Joshua", "Kennedy", "Nolan", "Samantha", "Dominic", 
  "Maya", "Leo", "Eva", "Joseph", "Aaliyah", "Eli", "Taylor", "Isaac", "Riley", "Lincoln", "Leah",
  "Grayson", "Madeline", "Asher", "Ariana", "Christopher", "Eliana", "Jaxon", "Ruby", "Ezra", 
  "Serenity", "Hudson", "Autumn", "Mateo", "Eleanor", "Angel", "Jade", "Cooper", "Melanie", "Carson", 
  "Naomi", "Easton", "Rylee", "Parker", "Hadley", "Ezra", "Gabriella", "Miles", "Sadie", "Sawyer", 
  "Isla", "Jason", "Allison", "Emmett", "Clara", "Micah", "Julia", "Adam", "Faith", "Maverick", 
  "Charlie", "Nathaniel", "Kaylee", "Elias", "London", "Axel", "Eliza", "Jonah", "Vivian", "Everett", 
  "Cora", "Ryder", "Valentina", "Greyson", "Alyssa", "Jameson", "Camila", "Kai", "Aubree", "Rowan", 
  "Lyla", "Bentley", "Piper", "Jasper", "Adeline", "August", "Brielle", "Jude", "Katherine", 
  "Beckett", "Delilah", "Malachi", "Mackenzie", "Brooks", "Jocelyn", "Emiliano", "Payton", "Xavier", 
  "Alina", "Calvin", "Reese", "Grant", "Amaya", "Alan", "Athena", "Bennett", "Kinsley", "Elliot", 
  "Ayla", "River", "Nicole", "Barrett", "Daisy", "Roman", "Rebecca", "Theo", "Brooklynn", "Giovanni", 
  "Lila", "Francisco", "Molly", "Ezekiel", "Leila", "Zane", "Adelaide", "Vincent", "Amber", "Max", 
  "Phoebe", "Miles", "Maria", "Gavin", "Camilla", "Amir", "Elliana", "Tristan", "Alexandra", 
  "Silas", "Georgia", "Archer", "Daniela", "Caden", "Harley", "Omar", "Hope", "Kobe", "Tessa", 
  "Zion", "Gracie", "Charlie", "Alexis", "Luis", "Maggie", "Camden", "Alivia", "Preston", 
  "Harmony", "Oscar", "Morgan", "Leonardo", "Jasmine", "Damian", "Briana", "Diego", "Paislee", 
  "Zachary", "Gemma", "Enzo", "Dahlia", "Jax", "Harlow"
];

// Real locations
const realLocations = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", 
  "San Jose, CA", "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", 
  "Columbus, OH", "Indianapolis, IN", "Charlotte, NC", "San Francisco, CA", 
  "Seattle, WA", "Denver, CO", "Washington, DC"
];

// Generate 50,000 student profiles
const students = Array.from({ length: 50000 }, (_, i) => ({
  id: i + 1,
  name: realNames[Math.floor(Math.random() * realNames.length)],
  location: realLocations[Math.floor(Math.random() * realLocations.length)],
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
