const voiceBtn = document.getElementById('voiceBtn');
const darkToggle = document.getElementById('darkModeToggle');
const searchInput = document.querySelector('.search-bar');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

voiceBtn.addEventListener('click', () => {
  recognition.start();
  voiceBtn.textContent = 'Listening...';
});

recognition.onend = () => {
  voiceBtn.textContent = 'Voice Command';
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase().trim();
  console.log("Voice Command:", transcript);

  // Page Navigation
  if (
    transcript.includes("open dashboard") || 
     transcript.includes("open dashboard page")  ||
     transcript.includes("go to dashboard page") ||
    transcript.includes("go to dashboard") || 
    transcript.includes("navigate to dashboard page") ||
    transcript.includes("navigate to dashboard")
  ) {
    window.location.href = "doctorpanel.html";

  } else if (
    transcript.includes("open appointments") || 
    transcript.includes("open appointments page") ||
    transcript.includes("go to appointments") ||
    transcript.includes("go to appointments page") ||
    transcript.includes("navigate to appointments") ||
    transcript.includes("navigate to appointments page")
  ) {
    window.location.href = "docappointment.html";

  } else if (
    transcript.includes("open patients") || 
    transcript.includes("open patients page") || 
    transcript.includes("go to patients") || 
    transcript.includes("go to  patients page") || 
    transcript.includes("navigate to patients") || 
    transcript.includes("navigate to patients page") || 
    transcript.includes("my patients") || 
    transcript.includes("my patients page") || 
    transcript.includes("patients page")
  ) {
    window.location.href = "docpatient.html";

  } else if (
    transcript.includes("open prescriptions") || 
    transcript.includes("open prescriptions page") || 
    transcript.includes("go to prescriptions") ||
    transcript.includes("go to prescriptions page") ||
    transcript.includes("navigate to prescriptions") ||
    transcript.includes("navigate to prescriptions page") ||
    transcript.includes("prescription page")
  ) {
    window.location.href = "docprescription.html";

  } else if (
    transcript.includes("open profile") || 
    transcript.includes("open profile page") || 
    transcript.includes("go to profile") ||
    transcript.includes("go to profile page") || 
    transcript.includes("navigate to profile") ||
    transcript.includes("navigate to profile page") ||
    transcript.includes("profile page")
  ) {
    window.location.href = "docprofile.html";

  } else if (
    transcript.includes("logout") || 
    transcript.includes("open logout") || 
    transcript.includes("open logout page") || 
    transcript.includes("go to logout") || 
    transcript.includes("go to logout page") || 
    transcript.includes("log out") || 
    transcript.includes("sign out") || 
    transcript.includes("exit dashboard")
  ) {
    window.location.href = "doclogout.html";

  // Dark Mode
  } else if (
    transcript.includes("dark mode on") || 
    transcript.includes("on dark mode") || 
    transcript.includes("on the dark mode") || 
    transcript.includes("turn on dark mode")
  ) {
    darkToggle.checked = true;
    document.body.classList.add('dark');

  } else if (
    transcript.includes("dark mode off") || 
    transcript.includes("off dark mode") || 
    transcript.includes("off the dark mode") || 
    transcript.includes("turn off dark mode")
  ) {
    darkToggle.checked = false;
    document.body.classList.remove('dark');

  }  else if (
    transcript.includes("tell me today's summary") ||
    transcript.includes("today's summary") ||
    transcript.includes("dashboard summary")
  ) {
    const appointments = document.querySelector('.card:nth-child(1) p')?.textContent || "0";
    const patients = document.querySelector('.card:nth-child(2) p')?.textContent || "0";
    const prescriptions = document.querySelector('.card:nth-child(3) p')?.textContent || "0";
  
    const summary = `You have ${appointments} appointments, ${patients} total patients, and ${prescriptions} prescriptions today.`;
    speakText(summary);
  } else if (
    transcript.includes("reload page") || 
    transcript.includes("refresh page")
  ) {
    speakText("Reloading the page.");
    location.reload();
  } else if (transcript.includes("stop listening")) {
    speakText("Okay, voice assistant stopped.");
    recognition.stop();
  }else if (
    transcript.includes("how many appointments today") || 
    transcript.includes("how many appointments")
  ) {
    const appointments = document.querySelector('.card:nth-child(1) p')?.textContent || "0";
    speakText(`You have ${appointments} appointments today.`);

  } else if (
    transcript.includes("how many patients") ||
    transcript.includes("how many patients today")
  ) {
    const patients = document.querySelector('.card:nth-child(2) p')?.textContent || "0";
    speakText(`You have ${patients} patients.`);

  } else if (
    transcript.includes("how many prescriptions") || 
    transcript.includes("how many prescriptions today")
  ) {
    const prescriptions = document.querySelector('.card:nth-child(3) p')?.textContent || "0";
    speakText(`You have ${prescriptions} prescriptions today.`); 
  }
  
};
