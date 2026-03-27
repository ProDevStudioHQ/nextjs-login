import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Mock database (in-memory)
// In a real application, you would use a database like MongoDB or PostgreSQL
export const users: User[] = [];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((u) => u.email === email);
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser: User = { ...user, password: hashedPassword, id: Date.now().toString() };
  users.push(newUser);
  return newUser;
};

export const comparePassword = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};
