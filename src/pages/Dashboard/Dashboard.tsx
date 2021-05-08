import React from "react";
import Button from "../../components/Button";
import EmailList from "../../components/EmailList/EmailList";
import Nav from "../../components/Nav/Nav";
import { useApp } from "../../context/app-context";

const Dashboard = () => {
  const { user } = useApp();
  return (
    <>
      <div>
        <div className="fit md:grid md:grid-cols-5">
          <div className="py-4 px-8 md:col-span-1 bg-gray-500">
            <div>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
              <div className="px-4 sm:px-0">
                <h3 className="mt-2 text-sm font-medium leading-6 text-white">
                  {user.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-4 bg-gray-100">
            <Nav />
            <div className="mt-5 grid grid-cols-4">
              <div className=" ml-2 mr-2 col-span-1">
                <Button
                  type="button"
                  style={{ backgroundColor: "rgba(16, 185, 129, 1)" }}
                >
                  Compose Mail
                </Button>
              </div>
              <div className="col-span-3">
                <EmailList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
