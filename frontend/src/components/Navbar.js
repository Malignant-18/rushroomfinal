function Navbar() {
    const links = [
      { href: "/", name: "home" },
      { href: "/map", name: "map" },
      { href: "/review", name: "review" },
      { href: "/profile", name: "profile" },
    ];
  
    return (
      <>
        <nav >
          <ul className="nav-list">
            {links.map((link, index) => (
              <li key={index} className="nav-item">
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
  
        <style jsx>{`
          /* Navbar styles */
          .navbar {
            background-color: #00aa0; /* Navbar background color */
            color: white;
            padding: 10px 20px;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%; /* Full width */
            z-index: 1000; /* Stays on top */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Slight shadow */
          }
  
          /* Navigation list */
          .nav-list {
            display: flex;
            justify-content: space-around; /* Evenly space items */
            align-items: center;
            list-style: none; /* Remove bullets */
            margin: 0;
            padding: 0;
          }
  
          /* Navigation items */
          .nav-item {
            margin: 0 10px;
          }
  
          /* Navigation links */
          .nav-link {
            text-decoration: none; /* Remove underline */
            color: white; /* Link color */
            font-size: 1rem; /* Font size */
            font-weight: bold;
            transition: color 0.3s ease; /* Smooth color transition */
          }
  
          .nav-link:hover {
            color: #d4e2f5; /* Lighter blue on hover */
          }
  
          /* Responsive navbar for smaller screens */
          @media screen and (max-width: 768px) {
            .nav-list {
              flex-direction: column; /* Stack items vertically */
              align-items: flex-start; /* Align items to the left */
            }
  
            .nav-item {
              margin: 5px 0;
            }
  
            .navbar {
              padding: 15px; /* Adjust padding for small screens */
            }
          }
        `}</style>
      </>
    );
  }
  
  export default Navbar;
  