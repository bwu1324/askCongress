function newThread(event) {
	// don't reload page
	event.preventDefault();

	// grab form input
	const title = document.getElementById('title').value;
	const body = document.getElementById('body').value;
	const tags = document.getElementById('tags').value;

	const tooltip = document.getElementById('tooltip');

	// create new post req
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/newThread', true);
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			tooltip.style.display = 'none';

			const response = JSON.parse(this.response);

			// if not successful, show tooltip for reason
			if (!response.success) {
				tooltip.innerHTML = response.message;
				tooltip.style.display = 'block';
			}
			// otherwise redirect to thread page
			else {
				window.location.href = `/thread/${response.message}`;
			}
		}
	};

	xhr.send(JSON.stringify({
		title,
		body,
		tags
	}));
}

const form = document.getElementById('newThreadForm');
form.addEventListener('submit', newThread);