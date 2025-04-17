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

  if (transcript.includes("open dashboard") || transcript.includes("open dashboard page") || transcript.includes("go to dashboard page")|| transcript.includes("go to dashboard") || transcript.includes("dashboard page")) {
    speakText("Opening dashboard.");
    window.location.href = "adminpanel.html";

  } else if (transcript.includes("open appointments") || transcript.includes("open appointments page") || transcript.includes("go to appointments") || transcript.includes("go to appointments page") || transcript.includes("appointments page")) {
    speakText("Opening appointments page.");
    window.location.href = "adappointment.html";

  } else if (transcript.includes("open patients") || transcript.includes("open patients page") || transcript.includes("go to patients") || transcript.includes("go to patients page") || transcript.includes("patients page")) {
    speakText("Opening patients page.");
    window.location.href = "adpatient.html";

  } else if (transcript.includes("open doctors") || transcript.includes("open doctors page") || transcript.includes("go to doctors") || transcript.includes("go to doctors page") || transcript.includes("doctors page")) {
    speakText("Opening doctors page.");
    window.location.href = "addoctor.html";

  } else if (transcript.includes("open billing") || transcript.includes("open billing page") || transcript.includes("go to billing") || transcript.includes("go to billing page") || transcript.includes("billing page")) {
    speakText("Opening billing page.");
    window.location.href = "adbilling.html";

  } else if (transcript.includes("open inventory") || transcript.includes("open inventory page") || transcript.includes("go to inventory") || transcript.includes("go to inventory page") || transcript.includes("inventory page")) {
    speakText("Opening inventory page.");
    window.location.href = "adinventory.html";

  }else if (transcript.includes("open reports") || transcript.includes("open reports page") || transcript.includes("go to reports") || transcript.includes("go to reports page") || transcript.includes("reports page")) {
    speakText("Opening reports page.");
    window.location.href = "adreports.html";

  }else if (transcript.includes("open settings") ||transcript.includes("open settings page") || transcript.includes("go to settings") || transcript.includes("go to settings page") || transcript.includes("settings page")  ) {
    speakText("Opening settings page.");
    window.location.href = "adsettings.html";

  } else if (transcript.includes("open logout") || transcript.includes("open logout page") || transcript.includes("go to logout") || transcript.includes("go to logout page")  || transcript.includes("logout page")) {
    speakText("Logging out.");
    window.location.href = "adsettings.html";

  } else if (transcript.includes("dark mode on") || transcript.includes("turn on dark mode") || transcript.includes("on dark mode") ) {
    darkToggle.checked = true;
    document.body.classList.add('dark');
    speakText("Dark mode enabled.");

  } else if (transcript.includes("dark mode off") || transcript.includes("turn off dark mode") || transcript.includes("off dark mode")) {
    darkToggle.checked = false;
    document.body.classList.remove('dark');
    speakText("Dark mode disabled.");

  } else if (transcript.includes("dashboard summary")) {
    const appointments = document.querySelector('.card:nth-child(1) p')?.textContent || "0";
    const patients = document.querySelector('.card:nth-child(2) p')?.textContent || "0";
    const doctors = document.querySelector('.card:nth-child(3) p')?.textContent || "0";

    const summary = `You have ${appointments} appointments, ${patients} total patients, and ${doctors} doctors today.`;
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

  } else if (transcript.includes("how many doctors")) {
    const doctors = document.querySelector('.card:nth-child(3) p')?.textContent || "0";
    speakText(`There are ${doctors} doctors.`);

  } else if (transcript.startsWith("search")) {
    const searchTerm = transcript.replace("search", "").trim();
    searchInput.value = searchTerm;
    speakText(`Searching for ${searchTerm}`);
    // You can trigger a real search here if needed

  } else {
    speakText("Sorry, I didn't understand that command.");
  }
};

function speakText(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
