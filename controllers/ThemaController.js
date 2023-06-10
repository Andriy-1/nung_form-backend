import db from '../db/connect.js';

const SQL = {
	getAll: `SELECT * FROM thema`,
	remove: `DELETE FROM thema WHERE id = $1 RETURNING *`,
	create: `INSERT INTO thema (title, description) values ($1, $2) RETURNING *`,
	update: `UPDATE thema SET title = $1, description = $2 WHERE id =$3 RETURNING *`
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
			const updatedThemaList = await db.query(SQL.getAll);
			const updatedThema = updatedThemaList.rows;
			return res.json({
				success: true,
				thema: updatedThema,
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

// export const create = async (req, res) => {
// 	try {
// 		const { name } = req.body;

// 		const newData = await db.query(SQL.create, [title,description]);
// 		const data = newData.rows[0];
// 		console.log(data);
// 		res.json(data);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json({
// 			message: 'Щось пішло не так. Спробуйте знову',
// 		});
// 	}
// };

export const update = async (req, res) => {
	try {
		const id = req.params.id;
		const { title, description } = req.body;
		const upadateData = await db.query(SQL.update, [title, description, id]);
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