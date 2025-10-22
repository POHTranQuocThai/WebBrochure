const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-links">
                    {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                        <a key={link} href="#" className="footer-link">
                            {link}
                        </a>
                    ))}
                </div>
                <div className="footer-social" aria-label="Theo dõi chúng tôi">
                    <a href="#" className="social-item fb" aria-label="Facebook">
                        <span className="social-icon" aria-hidden>
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                <path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 4.94 3.62 9.05 8.36 9.88v-6.99H7.84v-2.9h2.4V9.83c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.12.18 2.12.18v2.32h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22v6.99c4.74-.83 8.36-4.94 8.36-9.88Z" />
                            </svg>
                        </span>
                        <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="social-item tk" aria-label="TikTok">
                        <span className="social-icon" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="18"
                                height="18"
                                fill="currentColor"
                            >
                                <path d="M12.5 2c.6 2.8 2.7 5 5.5 5.3v2.1a7.9 7.9 0 0 1-5.1-1.7v7.2a5.8 5.8 0 1 1-5.8-5.8c.2 0 .5 0 .7.02v2.2a3.6 3.6 0 1 0 2.9 3.5V2h1.8Z" />
                            </svg>
                        </span>
                        <span className="sr-only">TikTok</span>
                    </a>

                    <a href="tel:0900000000" className="social-item phone" aria-label="Gọi điện">
                        <span className="social-icon" aria-hidden>
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                                <path fill="currentColor" d="M6.6 10.8a13.6 13.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.1-.23 11.2 11.2 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.6 17.6 0 0 1 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.2 11.2 0 0 0 .56 3.5 1 1 0 0 1-.23 1.1Z" />
                            </svg>
                        </span>
                        <span className="sr-only">Gọi</span>
                    </a>
                </div>


                <div className="footer-bottom">
                    <div className="footer-love">
                        <span className="heart">❤️</span>
                        <p className="footer-tagline">Khám phá các điểm tham quan và thưởng thức ẩm thực địa phương — trải nghiệm không thể bỏ lỡ cho mọi du khách.</p>
                        <span className="heart">❤️</span>
                    </div>

                    <p className="footer-copyright">© 2025 Eatery Guide. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
