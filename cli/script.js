// List of random names
const randomNames = [
    'Alex Johnson', 'Maria Lopez', 'James Smith', 'Emily Davis', 'Michael Brown',
    'Sophia Wilson', 'John Miller', 'Emma Martinez', 'Robert Garcia', 'Olivia Anderson',
    'Daniel Hernandez', 'Liam Clark', 'Isabella Lewis', 'Ethan Young', 'Mia Hall',
    'David King', 'Ava Adams', 'Matthew Baker', 'Charlotte Perez', 'Noah Turner',
    // Add more names until there are 500 unique names
    'Chris Evans', 'Scarlett Johansson', 'Mark Ruffalo', 'Chris Hemsworth',
    'Tom Hiddleston', 'Brie Larson', 'Samuel Jackson', 'Robert Downey Jr.',
    'Jeremy Renner', 'Paul Rudd', 'Elizabeth Olsen', 'Anthony Mackie',
    'Sebastian Stan', 'Tom Holland', 'Chadwick Boseman', 'Benedict Cumberbatch',
    'Zoe Saldana', 'Karen Gillan', 'Chris Pratt', 'Dave Bautista', 'Vin Diesel',
    'Bradley Cooper', 'Josh Brolin', 'Chris Pine', 'Gal Gadot', 'Henry Cavill'
  ];
  
  // List of random locations
  const randomLocations = [
    'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
    'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
    'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
    'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
    // Add more locations until there are 500 unique locations
    'Boston, MA', 'El Paso, TX', 'Detroit, MI', 'Nashville, TN', 'Portland, OR',
    'Memphis, TN', 'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD',
    'Milwaukee, WI', 'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Mesa, AZ'
  ];
  
  // Generate random student data
  const students = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: randomNames[Math.floor(Math.random() * randomNames.length)],
    location: randomLocations[Math.floor(Math.random() * randomLocations.length)],
    interestedInYoga: Math.random() > 0.5 // Random chance of being interested
  }));
  
  const scanBtn = document.getElementById('scanBtn');
  const progressBar = document.getElementById('progressBar');
  const scanningArea = document.getElementById('scanningArea');
  const totalProfilesElem = document.getElementById('totalProfiles');
  const boostedProfilesElem = document.getElementById('boostedProfiles');
  const apiKeyInput = document.getElementById('apiKey');
  
  let currentIndex = 0;
  
  function simulateBotScan(student) {
    // Representing a code-like scan output
    const profileText = `Scanning... { id: ${student.id}, name: "${student.name}", location: "${student.location}", interestedInYoga: ${student.interestedInYoga} }`;
  
    // Append code-like text in the scanning area to simulate "hacking" through the data
    scanningArea.textContent += `${profileText}\n`;
  
    // Scroll to the bottom to keep the latest text in view
    scanningArea.scrollTop = scanningArea.scrollHeight;
  }
  
  function updateInsights(total, recommended) {
    totalProfilesElem.textContent = total;
    boostedProfilesElem.textContent = recommended;
  }
  
  function startScanning() {
    // Disable the button to avoid re-clicking
    scanBtn.disabled = true;
    scanningArea.textContent = ''; // Clear previous scans
    progressBar.value = 0;
  
    let recommendedCount = 0;
    const scanDuration = 10 * 60 * 1000; // 10 minutes
    const intervalTime = scanDuration / students.length; // Time per scan
  
    const interval = setInterval(() => {
      if (currentIndex >= students.length) {
        clearInterval(interval); // Stop scanning when all students are processed
        scanBtn.disabled = false; // Re-enable the button for another scan
        currentIndex = 0; // Reset for next scan
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
  