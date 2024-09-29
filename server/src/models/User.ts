import db from '../database/db';

const User = {
  // get user info with email or id
  async get({ userId, email }: { userId?: number; email?: string }) {
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
  // create a new user
  async create(email: string, password: string) {
    const newUser = await db.user.create({
      data: {
        email,
        password,
      },
      select: {
        id: true,
      },
    });
    return newUser;
  },
};

export default User;
