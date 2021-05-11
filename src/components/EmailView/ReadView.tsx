import React from "react";
import { Email } from "../../context/app-context";

const ReadView: React.FC<{ email: Email }> = ({ email }) => {
  if (!email) {
    return null;
  }
  return (
    <dl className="max-w-2xl">
      <div>
        <dt className="text-lg leading-6 font-medium text-gray-900">
          {email.subject}
        </dt>
        <dd className="mt-2 text-base text-gray-500">{email.body}</dd>
      </div>
    </dl>
  );
};

export default ReadView;
