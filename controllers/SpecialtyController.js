import db from '../db/connect.js';

const SQL = {
	getAll: `SELECT * FROM specialty`,
	create: `INSERT INTO specialty (name) values ($1) RETURNING *`,
	remove: `DELETE FROM specialty WHERE id = $1 RETURNING *`,
}
export const getAll = async (req, res) => {
	try {
		const data = await db.query(SQL.getAll);
		res.json(data.rows);

	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Щось пішло не так. Спробуйте знову."
		});

	}
};

export const create = async (req, res) => {
	try {
		const { name } = req.body;
		const newData = await db.query(SQL.create, [name]);
		const data = newData.rows;
		console.log(data);

		res.json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Щось пішло не так. Спробуйте знову',
		});
	}
};

export const remove = async (req, res) => {
	try {
		const id = req.params.id;
		const resData = await db.query(SQL.remove, [id]);
		const delData = resData.rows[0];
		const isDel = resData.rowCount;

		if (isDel) {
			// Отримання оновленої таблиці
			const updatedStatusList = await db.query(SQL.getAll);
			const updatedStatus = updatedStatusList.rows;
			return res.json({
				success: true,
				message: `Спеціальність ${delData.name} видалено з таблиці`,
				status: updatedStatus,
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
