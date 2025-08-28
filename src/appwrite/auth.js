import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwritePROJECTID);

    this.account = new Account(this.client);
  }

  async createUser({email, password, name}) {
    try {
      const UserAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (UserAccount) {
        return this.Login({ email, password });
      } else {
        return UserAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createUser :: error ", error);
    }
  }

  async Login({email, password}) {
    const login = await this.account.createEmailPasswordSession(
      email,
      password
    );
    return login;
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: currentSession :: error ", error);

      return null;
    }
  }

  async Logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;
