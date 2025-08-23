export = class User {
  id: number = 0;
  username: string = "";
  email: string = "";
  password_hash: string = "";
  created_at: Date = new Date();

  constructor(username?: string, email?: string, password_hash?: string) {
    if (username) this.username = username;
    if (email) this.email = email;
    if (password_hash) this.password_hash = password_hash;
  }
}