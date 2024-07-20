import app from './app';

const PORT = process.env.PORT;

app.get('/', (_req, res) => {
	res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
