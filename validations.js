import { body } from 'express-validator';

export const loginValidation = [
	body('email', 'Невірній формат пошти').isEmail(),
	body('password', 'Пароль повинен бути мінімум 5 символів').isLength({ min: 5 }),
];

export const registerValidation = [
	body("email", 'Невірній формат пошти').isEmail(),
	body("password", 'Пароль повинен бути мінімум 5 символів').isLength({ min: 5 }),
	body("name", 'Укажіть імя').isLength({ min: 3 }),
	body("key", 'Ключ повинен бути мінімум 10 символів').isLength({ min: 10 }),
];

export const postCreateValidation = [
	body('name', 'Введіть назву форми').isLength({ min: 3 }).isString(),
];
export const userCreateValidation = [
	body('fullName', 'Введіть ПІБ').isLength({ min: 3 }).isString(),
	body('position', 'Введіть посаду').isLength({ min: 3 }).isString(),
];

export const statusCreateValidation = [
	body('name', 'Введіть навчальна ступінь').isLength({ min: 3 }).isString(),
];
export const kursCreateValidation = [
	body('name', 'Введіть курс').isLength({ min: 1 }),
];
export const specialtyCreateValidation = [
	body('name', 'Введіть код та назву спеціальності').isLength({ min: 3 }).isString(),
];

export const themaCreateValidation = [
	body('title', 'Заповніть поле').isLength({ min: 5 }).isString(),
];

export const questionCreateValidation = [
	body('text', 'Заповніть поле').isLength({ min: 5 }).isString(),
];
export const answerCreateValidation = [
	body('text', 'Заповніть поле').isLength({ min: 3 }).isString(),
];

