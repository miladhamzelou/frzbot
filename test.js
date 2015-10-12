var request = require('request');

var data = {
	"update_id": 356426834,
	"message": {
		"message_id": 6015,
		"from": {
			"id": 21826676,
			"first_name": "Farshad",
			"username": "firiz"
		},
		"chat": {
			"id": 21826676,
			"first_name": "Farshad",
			"username": "firiz"
		},
		"date": 1435920104,
		"text": "\/fall"
	}
};

request.post('http://localhost:3000').json(data);
