import React, { useState } from "react";
import UserAPI from "../../api/user";
import { Email, useApp } from "../../context/app-context";
import Button from "../Button";
import Input from "../Input";

const ComposeEmailView = () => {
  const { user, closeModal, setSelectedEmail } = useApp();
  const [to, setTo] = useState<string>("");
  const [cc, setCC] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const composedEmail: Email = {
      id: Date.now().toString(),
      to: to,
      cc: cc,
      from: user.email,
      fromName: user.name,
      subject: subject,
      body: body,
      status: "NEW",
    };
    const emails = await UserAPI.composeEmail(composedEmail);
    setSelectedEmail(composedEmail);
    closeModal();
  };
  return (
    <form
      onSubmit={handleLogin}
      className="w-80 flex flex-col justify-between p-3"
    >
      <div className="flex flex-col space-y-3">
        <div>
          <Input
            id="to-eail-address"
            label="To address"
            type="email"
            name="to"
            placeholder="To"
            onChange={setTo}
          />
        </div>
        <div>
          <Input
            id="cc-eail-address"
            label="CC address"
            type="email"
            name="cc"
            placeholder="CC"
            required={false}
            onChange={setCC}
          />
        </div>
        <div>
          <Input
            id="subject"
            label="subject"
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={setSubject}
          />
        </div>
        <div>
          <textarea
            id="body"
            name="body"
            rows={3}
            className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="body"
            defaultValue={""}
            disabled={!(to.length || subject.length || body.length)}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit">Send</Button>
        </div>
      </div>
    </form>
  );
};

export default ComposeEmailView;
