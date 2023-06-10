import express from 'express';
import cors from 'cors';

import postFormRouter from './router/postForm.routers.js';
import authRouter from './router/auth.routers.js';
import statusRouter from './router/status.routers.js';
import kursRouter from './router/kurs.routers.js';
import specialtyRouter from './router/specialty.routers.js';
import themaRouter from './router/thema.routers.js';
import questionsRouter from './router/questions.routers.js';
import answerOptionsRouter from './router/answerOptions.routers.js';
import responsesRouter from './router/responses.routers.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', authRouter);
app.use('/api/v1', postFormRouter);
app.use('/api/v1', statusRouter);
app.use('/api/v1', kursRouter);
app.use('/api/v1', specialtyRouter);
app.use('/api/v1', themaRouter);
app.use('/api/v1', questionsRouter);
app.use('/api/v1', answerOptionsRouter);
app.use('/api/v1', responsesRouter);


app.listen(4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server OK');
});
