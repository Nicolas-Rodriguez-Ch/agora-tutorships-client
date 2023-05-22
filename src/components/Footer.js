import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookSquare,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

import '../assets/styles/components/Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copy">
        <span>© 2021 Agora</span>
      </div>
      <div className="footer__message">
        <span>Made with love in Make it Real</span>
      </div>
      <div className="footer__social">
        <Link href="/">
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link href="/">
          <FontAwesomeIcon icon={faFacebookSquare} />
        </Link>
        <Link href="/">
          <FontAwesomeIcon icon={faWhatsapp} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
