const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

if(localStorage.getItem("theme")){
  if(localStorage.getItem("theme") == "dark"){
    var theme = "dark";
    body.classList.add(theme);
    toggleButton.textContent = '☀';
  }
  else {
    var theme = "light";
    body.classList.add(theme);
    toggleButton.textContent = '☾';
  }
} else {
  body.classList.add('light');
  toggleButton.textContent = '☾';
}

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '☀';
    } else {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '☾';
    }
});