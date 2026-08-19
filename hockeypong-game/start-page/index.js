document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    const audio = document.getElementById('background-music');
    audio.play()
      .then(() => console.log("Audio started!"))
      .catch(error => console.error("Audio playback failed:", error));
  }
}, { once: true });