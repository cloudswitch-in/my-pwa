
  // Check if the browser supports PWA installation
  if (window.navigator.standalone === false) {
    // Show a prompt to the user to install your PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      const installPrompt = e;
      const installButton = document.querySelector('.js-install-button');
      installButton.addEventListener('click', () => {
        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the installation prompt');
          } else {
            console.log('User dismissed the installation prompt');
          }
        });
      });
      installButton.style.display = 'block';
    });
  }
  