import db from '../db/connect.js';

const SQL = {
	getAll: `SELECT responses.id, thema.title AS thema_name, 
	specialty.name AS specialty_name, 
	status.name AS status_name, 
	kurs.name AS kurs_name,
	questions.text AS questions_name,
	answer_options.text AS answer_options_name
	FROM responses 
	LEFT JOIN thema ON responses.thema_id = thema.id
	LEFT JOIN specialty ON responses.specialty_id = specialty.id
	LEFT JOIN status ON responses.status_id = status.id
	LEFT JOIN kurs ON responses.kurs_id = kurs.id
	LEFT JOIN questions ON responses.questions_id = questions.id
	LEFT JOIN answer_options ON responses.answer_options_id = answer_options.id`,
	remove: `DELETE FROM responses WHERE id = $1 RETURNING *`,
	removeAllStatus: `DELETE FROM responses WHERE status_id = $1 RETURNING *`,
	removeAllKurs: `DELETE FROM responses WHERE kurs_id = $1 RETURNING *`,
	removeAllThema: `DELETE FROM responses WHERE thema_id = $1 RETURNING *`,
	removeAllSpecialty: `DELETE FROM responses WHERE specialty_id = $1 RETURNING *`,
	create: `INSERT INTO responses (specialty_id, status_id, kurs_id, questions_id, answer_options_id, thema_id) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
	update: `UPDATE responses SET answer_options_id = $1 WHERE id =$2 RETURNING *`,
	check: `SELECT COUNT(*) AS count FROM responses WHERE "answer_options_id" = $1`
}

export const getAll = async (req, res) => {
	try {
		const resData = await db.query(SQL.getAll);
		return res.json({ success: true, response: resData.rows });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову.',
		});
	}
};
export const getOne = async (req, res) => {
	try {
		const resData = await db.query(SQL.getAll);
		res.json(resData.rows[0]);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову.',
		});
	}
};

export const removeAllStatus = async (req, res) => {
	try {
		const status_id = req.params.id;
		const resData = await db.query(SQL.removeAllStatus, [status_id]);
		const isDel = resData.rowCount;

		if (isDel) {
			// Отримання оновленої таблиці
			const updatedResonseList = await db.query(SQL.getAll);
			const updatedResponse = updatedResonseList.rows;
			return res.json({
				success: true,
				message: `Всі відповіді за навчальною ступінню видалено`,
				responses: updatedResponse,
			})
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати дані',
		});
	}
};
export const removeAllKurs = async (req, res) => {
	try {
		const kurs_id = req.params.id;
		const resData = await db.query(SQL.removeAllKurs, [kurs_id]);
		const isDel = resData.rowCount;

		if (isDel) {
			// Отримання оновленої таблиці
			const updatedResonseList = await db.query(SQL.getAll);
			const updatedResponse = updatedResonseList.rows;
			return res.json({
				success: true,
				message: `Всі відповіді за курсом видалено`,
				responses: updatedResponse,
			})
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати дані',
		});
	}
};
export const removeAllSpecialty = async (req, res) => {
	try {
		const specialty_id = req.params.id;
		const resData = await db.query(SQL.removeAllSpecialty, [specialty_id]);
		const isDel = resData.rowCount;
		console.log('resData', resData.rows);

		if (isDel) {
			// Отримання оновленої таблиці
			const updatedResonseList = await db.query(SQL.getAll);
			const updatedResponse = updatedResonseList.rows;
			return res.json({
				success: true,
				message: `Всі відповіді за спеціальність видалено`,
				responses: updatedResponse,
			})
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати дані',
		});
	}
};
export const removeAllThema = async (req, res) => {
	try {
		const thema_id = req.params.id;
		console.log('req.params', req.params);

		const resData = await db.query(SQL.removeAllThema, [thema_id]);
		const isDel = resData.rowCount;
		console.log('resData', resData.rows);

		if (isDel) {
			// Отримання оновленої таблиці
			const updatedResonseList = await db.query(SQL.getAll);
			const updatedResponse = updatedResonseList.rows;
			return res.json({
				success: true,
				message: `Всі відповіді із форми видалено`,
				responses: updatedResponse,
			})
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати дані',
		});
	}
};
export const remove = async (req, res) => {
	try {
		const id = req.params.id;
		const resData = await db.query(SQL.remove, [id]);
		const isDel = resData.rowCount;

		if (isDel) {
			// Отримання оновленої таблиці
			const updatedResonseList = await db.query(SQL.getAll);
			const updatedResponse = updatedResonseList.rows;
			return res.json({
				success: true,
				responses: updatedResponse,
			})
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати дані',
		});
	}
};

export const create = async (req, res) => {
	try {
		const { specialty_id, status_id, kurs_id, questions_id, answer_options_id, thema_id } = req.body;

		const resData = await db.query(SQL.check, [answer_options_id]);

		if (resData.rows[0].count > 0) {
			return res.status(404).json({
				message: 'Виберіть іншу відповідь',
			});
		}

		const newData = await db.query(SQL.create, [specialty_id, status_id, kurs_id, questions_id, answer_options_id, thema_id]);
		const data = newData.rows[0];
		console.log(data);

		const isCheck = newData.rowCount;

		if (isCheck) {
			// Отримання оновленої таблиці
			return res.json({
				success: true,
				message: "Вашу відповідь надіслано. Дякуємо.",
				data
			});
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову',
		});
	}
};
export const update = async (req, res) => {
	try {
		const id = req.params.id;
		const { answer_options_id } = req.body;

		const resData = await db.query(SQL.check, [answer_options_id]);

		if (resData.rows[0].count > 0) {
			return res.status(404).json({
				message: 'Виберіть іншу відповідь',
			});
		}

		const upadateData =
			await db.query(SQL.update, [answer_options_id, id]);
		const data = upadateData.rows[0];

		const isUpdate = upadateData.rowCount;

		if (isUpdate) {
			// Отримання оновленої таблиці
			return res.json({
				success: true,
				message: 'Дані оновлено',
				data,
			});
		}
		else {
			return res.status(404).json({
				message: 'Даних не знайдено',
			});
		}

	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося обновити форму',
		});
	}
};

// export const updateType = async (req, res) => {
// 	try {
// 		const { type, questions_id } = req.body;
// 		const upadateData =
// 			await db.query(SQL.updateType, [type, questions_id]);
// 		const data = upadateData.rows[0];
// 		console.log(data);

// 		const isUpdate = upadateData.rowCount;

// 		if (isUpdate) {
// 			// Отримання оновленої таблиці
// 			return res.json({
// 				success: true,
// 				data,
// 			});
// 		}
// 		else {
// 			return res.status(404).json({
// 				message: 'Даних не знайдено',
// 			});
// 		}

// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			message: 'Не вдалося обновити тип',
// 		});
// 	}
// };


//========================================================================================================================================================
// export const getOne = async (req, res) => {
// 	try {
// 		const postId = req.params.id;

// 		PostModel.findOneAndUpdate(
// 			{
// 				_id: postId,
// 			},
// 			{
// 				$inc: { viewsCount: 1 },
// 			},
// 			{
// 				returnDocument: 'after',
// 			},
// 			(err, doc) => {
// 				if (err) {
// 					console.log(err);
// 					return res.status(500).json({
// 						message: 'Не вдалося вернути статті',
// 					});
// 				}

// 				if (!doc) {
// 					return res.status(404).json({
// 						message: 'Стаття не знайдена',
// 					});
// 				}

// 				res.json(doc);
// 			},
// 		).populate('user');
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			message: 'Не вдалося отримати статті',
// 		});
// 	}
// };
// export const getThree = async (req, res) => {
// 	try {
// 		const posts = await db.query(`SELECT * FROM form ORDER BY id LIMIT 3`);
// 		res.json(posts.rows.reverse());
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			message: 'Щось пішло не так. Спробуйте знову.',
// 		});
// 	}
// };