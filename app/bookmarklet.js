BASE = 'http://localhost:9000/';
var link = document.createElement('link'),
    script = document.createElement('script');
link.rel = 'stylesheet';
link.href = BASE + 'fitbar.css';

script.src = BASE + 'fitbar.js'
document.head.appendChild(link);
document.head.appendChild(script);
