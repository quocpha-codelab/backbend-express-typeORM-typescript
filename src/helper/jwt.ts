import * as jwt from 'jsonwebtoken';

export const generate = (payload: object): string => {
	const token = jwt.sign(payload, process.env.JWT_KEY, {
		algorithm: 'HS256',
		notBefore: 0,
		expiresIn: 60 * 60 * 24 * 365, // 365 days
		issuer: process.env.APP_DOMAIN,
	});
	return token;
};

export const parse = (token: string): any => {
	try {
		const payload = jwt.verify(token, process.env.JWT_KEY, {
			algorithms: ['HS256'],
			issuer: process.env.APP_DOMAIN,
		});
		return payload;
	} catch (error) {
		return false;
	}
};
