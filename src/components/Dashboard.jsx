export default function Dashboard({ setPage, user, logout }) {
  return (
    <div className="container">
      <h2>Welcome, {user.name}</h2>
      <p>Account: {user.accountNumber}</p>
      <h3>Balance: ${user.balance}</h3>
      <button onClick={() => setPage("deposit")}>Deposit</button>
      <button onClick={() => setPage("withdraw")}>Withdraw</button>
      <button onClick={() => setPage("transfer")} style={{ backgroundColor: "#007bff", color: "white" }}>Transfer Money</button>
      <button onClick={() => setPage("balance")}>Check Balance</button>
      <button onClick={() => setPage("profile")} style={{ backgroundColor: "#007bff", color: "white" }}>My Profile</button>
      <button onClick={logout} style={{ backgroundColor: "red" }}>Logout</button>
    </div>
  );
}
