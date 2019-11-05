// post request to get model info for an input image
async function imagePOST(e) {
	e.preventDefault();	
	url = 'https://acnescan.pythonanywhere.com/classify_image'

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
		document.getElementById('loader').style.display = 'none';
		const obj = JSON.parse(result);

		// sort categories by highest value
		let sortable = [];
		for (let category in obj) {
			// only add non negative categories
			if (obj[category]) {
   			sortable.push([category, obj[category]]);
   		}
		}
		sortable.sort(function(a, b) {
		    return b[1] - a[1];
		});

		// display top 3 categories according to severity level
		let displayCategories = Math.min(3, sortable.length);
		console.log('displayCategories', displayCategories);

		for (let i = 0; i < displayCategories; i++) {
			const category = sortable[i][0];
			const value = sortable[i][1];
			let severity = document.getElementById(category).getElementsByClassName('severity')[0];
			if (value < 0.4) {
				severity.innerHTML = "We're not sure, but it looks like you have ";
			} else if (value < 0.6) {
				severity.innerHTML = "You might have ";
			} else {
				severity.innerHTML = "You have ";
			}
			document.getElementById(category).style.display = "block";
		}

	}, 1000)
}


// post request to add email to notification list for when app releases
async function emailNotificationPOST(e) {
	e.preventDefault();
	url = 'https://acnescan.pythonanywhere.com/save_email'

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
		
		// display the success message 
		if (response.ok) {
			document.getElementById('email-submit-message').style.color = '#44c767';	// green
			document.getElementById('email-submit-message').style.fontWeight = 'bold';
			document.getElementById('email-submit-message').innerHTML = 'Added &#128516';
		} else {
			document.getElementById('email-submit-message').innerHTML = '';
		}
	} catch (error) {
		console.log('error', error)
	}
}