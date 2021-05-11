import { Email, User } from "../context/app-context";
import { EMAILS_TOKEN, USERS_TOKEN } from "../utils/constant";

const UserAPI = {
  login: async (email: string, password: string) => {
    try {
      const data: any = window.localStorage.getItem(USERS_TOKEN);
      if (data) {
        const users: User[] = JSON.parse(data);
        const findUser = users.find(
          (u) => u.email === email && u.password === password
        );
        return findUser;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      return error;
    }
  },
  getInboxEmails: async (email: string) => {
    try {
      const data: any = window.localStorage.getItem(EMAILS_TOKEN);
      if (data) {
        const emails: Email[] = JSON.parse(data);
        const inboxEmails = emails.filter(
          (e) => e.to === email || e.cc === email
        );
        return inboxEmails;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
  getSentEmails: async (email: string) => {
    try {
      const data: any = window.localStorage.getItem(EMAILS_TOKEN);
      if (data) {
        const emails: Email[] = JSON.parse(data);
        const sentEmails = emails.filter((e) => e.from === email);
        return sentEmails;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
  composeEmail: async (email: Email) => {
    try {
      const data: any = window.localStorage.getItem(EMAILS_TOKEN);
      let emails: Email[] = [];
      if (data) {
        emails = [email, ...JSON.parse(data)];
      } else {
        emails = [email];
      }

      window.localStorage.setItem(EMAILS_TOKEN, JSON.stringify(emails));

      return emails;
    } catch (error) {}
  },
  getEmailsByUserEmail: async (email: string) => {
    try {
      const data: any = window.localStorage.getItem(EMAILS_TOKEN);
      if (data) {
        const emails: Email[] = JSON.parse(data);
        const allEmails = emails.filter(
          (e) => e.from === email || e.to === email || e.cc === email
        );

        return allEmails;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
  deleteEmailById: async (id: string) => {
    try {
      const data: any = window.localStorage.getItem(EMAILS_TOKEN);
      if (data) {
        const emails: Email[] = JSON.parse(data);
        const filterdEmails = emails.filter((e) => e.id !== id);
        if (filterdEmails) {
          window.localStorage.setItem(
            EMAILS_TOKEN,
            JSON.stringify(filterdEmails)
          );
        }
        return filterdEmails;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
  markEmailAsRead: async (email: Email) => {
    try {
      const data: any = window.localStorage.getItem(EMAILS_TOKEN);
      if (data) {
        const emails: Email[] = JSON.parse(data);
        const findIndex = emails.findIndex((e) => e.id === email.id);
        emails[findIndex] = { ...email, status: "READ" };

        if (emails) {
          window.localStorage.setItem(EMAILS_TOKEN, JSON.stringify(emails));
        }
        // return email;
      } else {
        // return [];
      }
    } catch (error) {}
  },
};

export default UserAPI;
