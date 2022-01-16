import connectToDb from 'database/db';
import User from 'database/models/user.model';
import { passwordHash } from 'database/utils/tools';

import { userExist } from 'database/services/user.service';

const handler = async (req, res) => {
  await connectToDb();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    // cek if user exists
    if (await userExist(email)) {
      res.status(400).json({ message: 'User exists' });
      return;
    }

    // hashed the password
    const hashedPwd = await passwordHash(password);

    try {
      const user = new User({
        email,
        password: hashedPwd,
      });
      await user.save();
      res.status(200).json({
        user: {
          _id: user._id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding user to the db',
        error: error.errors,
      });
    }
  }
};

export default handler;
