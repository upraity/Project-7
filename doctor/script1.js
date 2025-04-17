const voiceBtn = document.getElementById('voiceBtn');
const darkToggle = document.getElementById('darkModeToggle');
const searchInput = document.querySelector('.search-bar');
const micIcon = document.getElementById('micIcon');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

voiceBtn.addEventListener('click', () => {
  recognition.start();
});

recognition.onstart = () => {
  voiceBtn.textContent = 'Listening...';
  micIcon.style.visibility = 'visible';
};

recognition.onend = () => {
  voiceBtn.textContent = 'Voice Command';
  micIcon.style.visibility = 'hidden';
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase().trim();
  console.log("Voice Command:", transcript);

  if (transcript.includes("open dashboard") || transcript.includes("go to dashboard") || transcript.includes("open dashboard page") || transcript.includes("go to dashboard page") || transcript.includes("dashboard page")) {
    speakText("Opening dashboard.");
    window.location.href = "doctorpanel.html";

  } else if (transcript.includes("open appointments") || transcript.includes("go to appointments") || transcript.includes("open appointments page") || transcript.includes("go to appointments page") || transcript.includes("appointments page")) {
    speakText("Opening appointments page.");
    window.location.href = "docappointment.html";

  } else if (transcript.includes("open patients") || transcript.includes("open patients page") ||transcript.includes("go to patients") || transcript.includes("go to patients page") || transcript.includes("patients page") || transcript.includes("go to my patients page") || transcript.includes("go to my patients") ||transcript.includes("my patients")) {
    speakText("Opening patients page.");
    window.location.href = "docpatient.html";

  } else if (transcript.includes("open prescriptions") || transcript.includes("open prescriptions page") || transcript.includes("prescriptions page") || transcript.includes("go to prescriptions") || transcript.includes("go to prescriptions page")) {
    speakText("Opening prescriptions page.");
    window.location.href = "docprescription.html";

  } else if (transcript.includes("open profile") || transcript.includes("open profile page") || transcript.includes("go to profile") || transcript.includes("go to profile page")) {
    speakText("Opening profile page.");
    window.location.href = "docprofile.html";

  } else if (transcript.includes("logout") || transcript.includes("open logout") || transcript.includes("go to logout")|| transcript.includes("go to logout page")) {
    speakText("Logging out.");
    window.location.href = "doclogout.html";

  } else if (transcript.includes("dark mode on") || transcript.includes("turn on dark mode") || transcript.includes("on dark mode")) {
    darkToggle.checked = true;
    document.body.classList.add('dark');
    speakText("Dark mode enabled.");

  } else if (transcript.includes("dark mode off") || transcript.includes("turn off dark mode") || transcript.includes("off dark mode")) {
    darkToggle.checked = false;
    document.body.classList.remove('dark');
    speakText("Dark mode disabled.");

  } else if (transcript.includes("tell me today's summary") || transcript.includes("dashboard summary")) {
    const appointments = document.querySelector('.card:nth-child(1) p')?.textContent || "0";
    const patients = document.querySelector('.card:nth-child(2) p')?.textContent || "0";
    const prescriptions = document.querySelector('.card:nth-child(3) p')?.textContent || "0";

    const summary = `You have ${appointments} appointments, ${patients} total patients, and ${prescriptions} prescriptions today.`;
    speakText(summary);

  } else if (transcript.includes("reload page") || transcript.includes("refresh page")) {
    speakText("Reloading the page.");
    location.reload();

  } else if (transcript.includes("stop listening")) {
    speakText("Okay, voice assistant stopped.");
    recognition.stop();

  } else if (transcript.includes("how many appointments")) {
    const appointments = document.querySelector('.card:nth-child(1) p')?.textContent || "0";
    speakText(`You have ${appointments} appointments today.`);

  } else if (transcript.includes("how many patients")) {
    const patients = document.querySelector('.card:nth-child(2) p')?.textContent || "0";
    speakText(`You have ${patients} patients.`);

  } else if (transcript.includes("how many prescriptions")) {
    const prescriptions = document.querySelector('.card:nth-child(3) p')?.textContent || "0";
    speakText(`You have ${prescriptions} prescriptions today.`);

  } else if (transcript.startsWith("search")) {
    const searchTerm = transcript.replace("search", "").trim();
    searchInput.value = searchTerm;
    speakText(`Searching for ${searchTerm}`);
    // Trigger custom search function if you have one

  } else {
    speakText("Sorry, I didn't understand that command.");
  }
};

function speakText(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
