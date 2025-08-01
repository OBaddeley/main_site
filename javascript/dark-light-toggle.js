const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

if(localStorage.getItem("theme")){
  if(localStorage.getItem("theme") == "dark"){
    var theme = "dark";
    body.classList.add(theme);
  }
  else {
    var theme = "light";
    body.classList.add(theme);
  }
} else {
  body.classList.add('light');
}

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
    }
});