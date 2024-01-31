// implementing the authorization
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// all the methods are present on the appwrite docs

export class AuthService {
    client = new Client();
    account;

    constructor()  {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            let userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // we will call another method if account exists
                return this.login({email,password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}) {
        try {
            return await this.account.createEmailSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            let currentUser = await this.account.get();
            if(currentUser){
                return currentUser;
            } else {
                 return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async logOut() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

// now we can access all functionalities from the below object
const authService = new AuthService();
export default authService;
