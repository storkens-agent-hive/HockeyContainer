document.addEventListener('DOMContentLoaded', function () {
  const banner = document.getElementById('start-banner');
  const audio = document.getElementById('background-music');

  if (!banner || !audio) {
    return;
  }

  banner.addEventListener('click', function () {
    audio.play()
      .then(() => {
        console.log('Audio started!');
        banner.classList.add('hidden');
      })
      .catch(error => {
        console.error('Audio playback failed:', error);
      });
  }, { once: true });
});
