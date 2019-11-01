var menu = document.getElementById('menu');
var nav = document.getElementById('nav');
var exit = document.getElementById('exit');
var try_cta = document.getElementById('try-cta');
var scan_cta = document.getElementById('scan-cta');
var home_container = document.getElementById('home-container');
var upload_container = document.getElementById('upload-container');
var results_container = document.getElementById('results-container');
var how_it_works_container = document.getElementById('how-it-works-container');

menu.addEventListener('click', function(e) {
	nav.classList.toggle('hide-mobile');
	e.preventDefault();
})

exit.addEventListener('click', function(e) {
	nav.classList.toggle('hide-mobile');
	e.preventDefault();
})

try_cta.addEventListener('click', function(e) {
	home_container.style.display = "none";
	upload_container.style.display = "block";
})

scan_cta.addEventListener('click', function(e) {
	results_container.style.display = "block";
	how_it_works_container.style.display = "none";
	upload_container.style.display = "none";
	nav.getElementsByTagName('li')[2].style.display = "none";
	e.preventDefault();
})