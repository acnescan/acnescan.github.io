// post request to get model info for an input image
async function imagePOST(e) {
	e.preventDefault();	
	url = 'http://acnescan.pythonanywhere.com/classify_image'

	// get image from user
	const formData = new FormData();
	const imagefile = document.querySelector('input[type="file"]').files[0];
	console.log('imagefile:', imagefile);
	formData.append('image', imagefile);

	// make the post request
	try {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: formData
		});
		result = await response.json();
		console.log(result);
		// display the returned 
		if (response.ok) {
			displayResults(result)
		}
	} catch (error) {
		console.log('error', error)
	}
}

function displayResults(result) {
	// show results after 1 second
	setTimeout(function () {
		document.getElementById("loader").style.display = "none";

		const obj = JSON.parse(result);
		const keys = Object.keys(obj);
		const vals = Object.values(obj);
		const max = Math.max.apply(null, vals);
		const len = keys.length;

		for (var i = 0; i < len; i++) {
			if (vals[i] == max) {
				document.getElementById(keys[i]).style.display = "block";
			};
			document.getElementById(keys[i] + "-score").innerHTML += vals[i];
		};

		document.getElementById("analysis").style.display = "block";
	}, 1000)
}


// post request to add email to notification list for when app releases
async function emailNotificationPOST(e) {
	e.preventDefault();
	url = 'http://acnescan.pythonanywhere.com/save_email'

	// get user's email
	const formData = new FormData();
	const email = document.forms['email-notification']['email'].value;
	console.log('email:', email);
	formData.append('email', email);

	// make the post request
	try {
		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: formData
		});
		result = await response.json();
		console.log(result);
	} catch (error) {
		console.log('error', error)
	}
}