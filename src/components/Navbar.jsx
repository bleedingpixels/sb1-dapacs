
import { useState } from 'react';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav>
      <div className="logo">MyApp</div>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"}>
        {/* ...existing navigation links... */}
      </ul>
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobile ? <CloseIcon /> : <MenuIcon />}
      </button>
    </nav>
  );
};

export default Navbar;