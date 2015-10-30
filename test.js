var request = require('request');

var data = {
	"update_id": 42653412,
	"message": {
		"message_id": 6,
		"from": {
			"id": 21826676,
			"first_name": "Farshad",
			"username": "firiz"
		},
		"chat": {
			"id": 21826676,
			"first_name": "Farshad",
			"username": "firiz",
			"type": "private"
		},
		"date": 1446234935,
		"text": "Farshad"
	}
};

request.post('http://localhost:3000').json(data);
