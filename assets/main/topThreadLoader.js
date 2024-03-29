var exclude = [];
// eslint-disable-next-line
function topThreadLoader() {
	// create new post req
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/getTop', true);
	xhr.setRequestHeader('Content-Type', 'application/json');

	xhr.onreadystatechange = function () {
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			const response = JSON.parse(this.response);

			const parent = document.getElementById('top-threads-container');

			// if sucessful, load comments if needed
			if (response.success) {
				for (let i = 0; i < response.threads.length; i++) {
					exclude.push(response.threads[i].threadId);
					parent.innerHTML += response.threads[i].thread;
				}
			}
		}
	};
	xhr.send(JSON.stringify({
		exclude
	}));
}