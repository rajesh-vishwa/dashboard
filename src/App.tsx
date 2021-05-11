import React from "react";
import { ComposeView, ReadView } from "./components/EmailView";
import Modal from "./components/Modal";
import { useApp } from "./context/app-context";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const App = () => {
  const { user, displayModal, closeModal, modalView, selectedEmail } = useApp();

  return (
    <>
      <div>{user ? <Dashboard /> : <Login />}</div>
      <Modal open={displayModal} onClose={closeModal}>
        {modalView === "EMAIL_COMPOSE_VIEW" && <ComposeView />}
        {modalView === "EMAIL_READ_VIEW" && <ReadView email={selectedEmail} />}
      </Modal>
    </>
  );
};

export default App;
