import React from "react";

const Footer = () => {
  return (
    <footer className=" vw-100 d-flex justify-content-center footer-bg py-2">
      <p>&copy; {new Date().getFullYear()} EasyTicket. All rights reserved.</p>
    </footer>
  );
};

export default Footer;