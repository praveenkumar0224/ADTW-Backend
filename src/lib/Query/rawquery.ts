import {Prisma} from '@prisma/client';

const deleteExpiredOtps = Prisma.sql`delete FROM otp WHERE EXTRACT(EPOCH FROM NOW() - otp."createdAt") >= expires_in::numeric;`;
const otp = {
	deleteExpiredOtps,
};

export default {
	otp,
};
