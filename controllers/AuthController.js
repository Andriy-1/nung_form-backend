import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db/connect.js';

export const register = async (req, res) => {
	try {
		const { name, email, key } = req.body;

		const resAuthData = await db.query(`SELECT COUNT(*) AS count FROM auth WHERE "email" = '${email}'`);

		if (resAuthData.rows[0].count > 0) {
			return res.status(404).json({
				message: 'Введіть іншу пошту',
			});
		}

		const secretKey = await db.query(`SELECT * FROM "key" WHERE name = $1`, [key]);


		if (secretKey) {
			const password = req.body.password;
			const salt = await bcrypt.genSalt(10);
			const hashPass = await bcrypt.hash(password, salt);

			const newAuthUser = await db.query(`INSERT INTO auth ("name", "email", "password_hash", "key_id") values ($1, $2, $3, $4) RETURNING *`, [name, email, hashPass, secretKey.rows[0].id]);
			const auth = newAuthUser.rows[0];
			console.log(auth);

			const token = jwt.sign(
				{
					_id: auth.id,
				},
				'secret123',
				{
					expiresIn: '5d',
				},
			);
			res.json({ success: true, auth, token });
		} else {
			res.status(406).json({
				message: 'Щось пішло не так. Перевірьте чи всі дані уведені вірно. Можливо якесь поле ненадане.',
			})
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося зарейструватися. Спробуйте пізніше.',
		});
	}
};

export const login = async (req, res) => {
	try {
		const resAuthData = await db.query(`SELECT * FROM auth WHERE email = $1`, [req.body.email]);
		const user = resAuthData.rows[0];

		if (!user) {
			return res.status(404).json({
				message: 'Невірний логін або пароль',
			});
		}
		const isValidPass = await bcrypt.compare(req.body.password, user.password_hash);

		if (!isValidPass) {
			return res.status(400).json({
				message: 'Невірний логін або пароль',
			});
		}

		const token = jwt.sign(
			{
				_id: user.id,
			},
			'secret123',
			{
				expiresIn: '5d',
			},
		);

		res.json({
			...user,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не вдалося авторизуваться',
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const allAuthUser = await db.query(`SELECT * FROM auth WHERE id = $1`, [req.userId]);
		const auth = allAuthUser.rows[0];
		console.log(auth);
		if (!auth) {
			return res.status(404).json({
				message: 'Користувача не знайдено',
			});
		}
		res.json(auth);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Немає доступу',
		});
	}
};
