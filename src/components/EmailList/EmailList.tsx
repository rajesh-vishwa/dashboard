import React, { useEffect, useState } from "react";
import UserAPI from "../../api/user";
import { Email, useApp } from "../../context/app-context";
import Delete from "../Icons/Delete";
import OpenEmail from "../Icons/OpenEmail";
import Input from "../Input";

const EmailList: React.FC<{ emailType: "inbox" | "sent" }> = ({
  emailType,
}) => {
  const {
    user,
    openModal,
    setEmailReadView,
    setSelectedEmail,
    selectedEmail,
  } = useApp();
  const [emails, setEmails] = useState<Email[]>([]);

  const run = async () => {
    let data: Email[] = [];
    if (emailType === "inbox") {
      data = await UserAPI.getInboxEmails(user.email);
    } else {
      data = await UserAPI.getSentEmails(user.email);
    }
    setEmails(data);
  };

  useEffect(() => {
    run();
  }, [emailType, selectedEmail]);

  const handleDelete = async (e: any, email: Email) => {
    e.preventDefault();
    const result = await UserAPI.deleteEmailById(email.id);
    const copyEmails = [...emails].filter((e) => e.id !== email.id);
    setEmails(copyEmails);
  };

  const handleReadEmail = async (e: any, email: Email) => {
    e.preventDefault();
    await UserAPI.markEmailAsRead(email);
    let data: Email[] = [];
    if (emailType === "inbox") {
      data = await UserAPI.getInboxEmails(user.email);
    } else {
      data = await UserAPI.getSentEmails(user.email);
    }
    setEmails(data);
    setSelectedEmail({ ...email, status: "READ" });
    setEmailReadView();
    openModal();
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" mr-2 shadow overflow-hidden border-b border-gray-200 sm:rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th colSpan={3}>
                    {emailType === "inbox"
                      ? `Inbox (${
                          emails.filter((e) => e.status === "NEW").length
                        }) `
                      : "Sent Items"}
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span className="sr-only">NAme</span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span className="sr-only">Title</span>
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {emails.map((email) => (
                  <tr key={email.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-4 w-4">
                          <Input
                            id="chk-email"
                            label=""
                            type="checkbox"
                            name=""
                            onChange={() => {}}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {emailType === "inbox" ? email.from : email.to}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {email.subject}
                      </div>
                    </td>

                    <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex">
                        <button
                          onClick={(e) => handleReadEmail(e, email)}
                          type="button"
                        >
                          <OpenEmail />
                        </button>
                        <button
                          type="button"
                          className="ml-2"
                          onClick={(e) => handleDelete(e, email)}
                        >
                          <Delete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailList;
