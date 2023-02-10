// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Service Worker registered: ', registration);
      }, function(err) {
        console.log('Service Worker registration failed: ', err);
      });
    });
  }
  