import express from 'express';

const app = express();

app.get('/', (request, response) => {
	return response.json({ message: 'Hello World!' });
});

app.listen(8080, () => {
	console.log('Server started on port 8080!');
});
