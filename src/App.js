import React, { useState } from "react";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Balance from "./components/Balance";
import Transfer from "./components/Transfer";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ViewAllAccounts from "./components/ViewAllAccounts";
import AdminMenu from "./components/AdminMenu"; // Keeping for safety, though we might route around it
import AdminTransaction from "./components/AdminTransaction";
import AdminTransactionHistory from "./components/AdminTransactionHistory";
import Profile from "./components/Profile";
import TransactionSuccess from "./components/TransactionSuccess";
import UpdatePhone from "./components/UpdatePhone";
import ChangePassword from "./components/ChangePassword";
import BackButton from "./components/BackButton";
import AccountDetails from "./components/AccountDetails"; // Import new component

function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null); // { name: "...", accountNumber: 123 }
  const [admin, setAdmin] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [balance, setBalance] = useState(0);

  // New State for Admin Flow
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Scroll to top whenever page changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const navigate = (newPage, data = null) => {
    setPage(newPage);
    if (data) setTransactionDetails(data);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const updateBalance = (newBalance) => {
    setUser((prev) => ({ ...prev, balance: newBalance }));
  };

  return (
    <div className="App">
      {page === "landing" && <LandingPage setPage={setPage} />}

      {page === "login" && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Login setPage={setPage} setUser={handleLogin} />
        </div>
      )}

      {page === "admin-login" && <AdminLogin setPage={setPage} setAdmin={setAdmin} />}

      {/* Admin Flow */}
      {page === "admin-menu" && <AdminMenu setPage={setPage} admin={admin} />}

      {page === "admin-dashboard" && (
        <div style={{ width: '100%' }}>
          <AdminDashboard setPage={setPage} admin={admin} />
        </div>
      )}

      {page === "view-all-accounts" && (
        <ViewAllAccounts
          setPage={setPage}
          setAdmin={setAdmin} // In case needed
          setAccount={setSelectedAccount} // Pass setter to view details
        />
      )}

      {page === "account-details" && (
        <AccountDetails
          account={selectedAccount}
          setPage={setPage}
        />
      )}

      {page === "admin-history" && <AdminTransactionHistory setPage={setPage} />}

      {page === "create" && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <CreateAccount setPage={setPage} />
        </div>
      )}

      {user && (
        <>
          {page === "dashboard" && <Dashboard setPage={setPage} user={user} logout={handleLogout} />}

          {page === "deposit" && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Deposit user={user} setPage={navigate} updateBalance={updateBalance} />
            </div>
          )}

          {page === "withdraw" && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Withdraw user={user} setPage={navigate} updateBalance={updateBalance} />
            </div>
          )}

          {page === "transfer" && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Transfer user={user} setPage={navigate} updateBalance={updateBalance} />
            </div>
          )}

          {page === "transaction-success" && (
            <TransactionSuccess setPage={setPage} transactionDetails={transactionDetails} />
          )}

          {page === "balance" && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Balance user={user} setPage={setPage} />
            </div>
          )}

          {page === "profile" && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Profile user={user} setPage={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
