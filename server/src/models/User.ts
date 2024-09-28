import db from '../database/db';

const User = {
  async getUser({ userId, email }: { userId?: number; email?: string }) {
    if ((!userId && !email) || (userId && email)) {
      throw new Error('Bad method params');
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
        email,
      },
    });
    return user;
  },
};

export default User;
