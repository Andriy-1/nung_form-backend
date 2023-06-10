import db from '../db/connect.js';

const SQL = {
	getAll: `SELECT * FROM questions`,
	remove: `DELETE FROM questions WHERE id = $1 RETURNING *`,
	create: `INSERT INTO questions (text, thema_id) values ($1, $2) RETURNING *`,
	updateText: `UPDATE questions SET text = $1 WHERE id =$2 RETURNING *`,
	updateMandatory: `UPDATE questions SET mandatory = $1 WHERE id =$2 RETURNING *`
}

export const getAll = async (req, res) => {
	try {
		const resData = await db.query(SQL.getAll);
		res.json(resData.rows);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову.',
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
			const updatedQuestionList = await db.query(SQL.getAll);
			const updatedQuestion = updatedQuestionList.rows;
			return res.json({
				success: true,
				questions: updatedQuestion,
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
		const { text, thema_id } = req.body;

		const newData = await db.query(SQL.create, [text, thema_id]);
		const data = newData.rows[0];
		console.log(data);
		res.json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову',
		});
	}
};
export const updateText = async (req, res) => {
	try {
		const id = req.params.id;
		const { text } = req.body;
		const upadateData =
			await db.query(SQL.updateText, [text, id]);
		const data = upadateData.rows[0];

		const isUpdate = upadateData.rowCount;

		if (isUpdate) {
			// Отримання оновленої таблиці
			return res.json({
				success: true,
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

export const updateMendatory = async (req, res) => {
	try {
		const id = req.params.id;
		const { mandatory } = req.body;
		const upadateData =
			await db.query(SQL.updateMandatory, [mandatory, id]);
		const data = upadateData.rows[0];
		console.log(data);

		const isUpdate = upadateData.rowCount;

		if (isUpdate) {
			// Отримання оновленої таблиці
			return res.json({
				success: true,
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