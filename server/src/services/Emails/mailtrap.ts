import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_API_KEY;

export const client = new MailtrapClient({
  token: TOKEN!,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Cheat Meal",
};
