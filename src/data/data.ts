import { Email, User } from "../context/app-context";

const users: User[] = [
  { id: 1, email: "user1@test.com", password: "test", name: "User One" },
  { id: 2, email: "user2@test.com", password: "test", name: "User Two" },
];

const emails: Email[] = [
  {
    id: "email1",
    to: "user1@test.com",
    cc: "user2@test.com",
    from: "user2@test.com",
    fromName: "User Two",
    subject: "Meeting with Jon",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "NEW",
  },
  {
    id: "email2",
    to: "user1@test.com",
    cc: "user3@test.com",
    from: "user2@test.com",
    fromName: "User Two",
    subject: "Lorem Ipsum Demo",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "NEW",
  },
  {
    id: "email3",
    to: "user2@test.com",
    cc: "user2@test.com",
    from: "user1@test.com",
    fromName: "User One",
    subject: "Demo with Jon",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "NEW",
  },
  {
    id: "email4",
    to: "user2@test.com",
    cc: "user2@test.com",
    from: "user1@test.com",
    fromName: "User One",
    subject: "Send me details",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "NEW",
  },
];

export { users, emails };
