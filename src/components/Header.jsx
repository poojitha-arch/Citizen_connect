import "../App.css";

function Header() {
  return (
    <div className="header">
      <div className="logo-section">
        <h2>CitizenConnect Portal</h2>
        <p>National Governance Platform</p>
      </div>

      <div className="search-section">
        <input type="text" placeholder="Search Services..." />
        <button>Search</button>
      </div>
    </div>
  );
}

export default Header;