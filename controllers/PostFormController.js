import db from '../db/connect.js';

export const getAll = async (req, res) => {
	try {
		const resPosts = await db.query(`SELECT * FROM form`);
		res.json(resPosts.rows.reverse());
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову.',
		});
	}
};

export const getThree = async (req, res) => {
	try {
		const posts = await db.query(`SELECT * FROM form ORDER BY id LIMIT 3`);
		res.json(posts.rows.reverse());
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову.',
		});
	}
};

export const remove = async (req, res) => {
	try {

		const postId = req.params.id;
		const resPost = await db.query(`DELETE FROM form WHERE id = $1 RETURNING *`, [postId]);
		const post = resPost.rows[0];

		const valid = (err, doc) => {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Не вдалося видалити форму',
				});
			}

			if (!doc) {
				return res.status(404).json({
					message: 'Форму не знайдено',
				});
			}
		}

		return [valid, res.json({
			success: true,
			post,
		})]
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося отримати форму',
		});
	}
};

export const create = async (req, res) => {
	try {
		const { name } = req.body;

		const newThemaPost = await db.query(`INSERT INTO thema (title, description, form_id) values ($1, $2, $3) RETURNING *`, ["", "",]);
		const themaId = newThemaPost.rows[0].id;

		const newPost = await db.query(`INSERT INTO form (name, auth_id, thema_id) values ($1, $2, $3) RETURNING *`, [name, req.userId, themaId]);
		const post = newPost.rows[0];
		console.log(post);
		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову',
		});
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;
		const { name } = req.body;
		const upadatePost =
			await db.query(`UPDATE form 
		SET name = $1
		WHERE id =$2
		RETURNING *`, [name, postId]);
		const post = upadatePost.rows[0];
		console.log(post);

		res.json({
			success: true,
			post,
		});
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
