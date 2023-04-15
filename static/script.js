const messageForm = document.getElementById('messageForm');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const messagesDiv = document.getElementById('messages').children[0];

let dataMess = '';

setInterval(function() {

    fetch('http://localhost:5000/messages')
    .then(response => response.json())
    .then(data => {
        if (dataMess != JSON.stringify(data)) {
            dataMess = JSON.stringify(data);

            while (messagesDiv.firstChild) {
                messagesDiv.removeChild(messagesDiv.firstChild);
            }

            data.forEach(message =>{
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message-left');
                messageDiv.classList.add('pb-4');
                messageDiv.innerHTML = `<div>
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EbptJmNZGHczgEAMpsFBdmRcguZR-ueCbYTO5JEpL1u1IGBARh8Rz7CfB_PHMvGPCsg&usqp=CAU"class="rounded-circle mr-1" width="40" height="40">
                                            <div class="text-muted small text-nowrap mt-2">${message.time}</div>
                                        </div>
                                        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                            <div class="font-weight-bold mb-1">${message.name}</div>
                                            ${message.message}
                                        </div>`;
                messagesDiv.appendChild(messageDiv);
            })
        }
    });
}, 1000);
    

messageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const name = nameInput.value;
	const message = messageInput.value;
    const currentTime = getCurrentTime();
	fetch('http://localhost:5000/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name: name, message: message, time: currentTime })
	})
    messageInput.value = "";
});

function getCurrentTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    h = h ? h : 12;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    const timeString = h + ':' + m + ' ' + ampm;
    return timeString;
}