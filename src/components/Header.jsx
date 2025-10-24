import { useState } from "react";
import LanguageToggle from "./LanguageToggle";
import Logo from "../assets/img/logo5.png";

const Header = ({ t, activeSection, isHeaderFixed }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const handleNav = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        // Use CSS scroll-margin-top on sections for consistent offset under fixed header
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        setMenuOpen(false);
    };

    return (
        <header className={`header ${isHeaderFixed ? "header-fixed" : "header-normal"}`}>
            <div className="language-toggle">
                <LanguageToggle />
            </div>
            <div className="container">
                <nav className="nav">
                    {/* Mobile burger */}
                    <button
                        className="mobile-menu-btn"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(v => !v)}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                    <div className="nav-links">
                        <a
                            href="#home"
                            onClick={(e) => handleNav(e, "home")}
                            className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                        >
                            {t("header.home")}
                        </a>
                        <a
                            href="#about"
                            onClick={(e) => handleNav(e, "about")}
                            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                        >
                            {t("header.about")}
                        </a>
                        <a
                            href="#products"
                            onClick={(e) => handleNav(e, "products")}
                            className={`nav-link ${activeSection === "products" ? "active" : ""}`}
                        >
                            {t("header.products")}
                        </a>
                    </div>

                    <div className="logo">
                        <img src={Logo} alt="logo" width={50} height={50} />
                    </div>

                    <div className="nav-links">
                        <a
                            href="#order"
                            onClick={(e) => handleNav(e, "order")}
                            className={`nav-link ${activeSection === "order" ? "active" : ""}`}
                        >
                            {t("header.order")}
                        </a>
                        <a
                            href="#highlights"
                            onClick={(e) => handleNav(e, "highlights")}
                            className={`nav-link ${activeSection === "highlights" ? "active" : ""}`}
                        >
                            {t("header.highlights")}
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => handleNav(e, "contact")}
                            className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                        >
                            {t("header.contact")}
                        </a>
                    </div>
                </nav>
                {/* Mobile dropdown menu */}
                {menuOpen && (
                    <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
                        <div className="mobile-menu-links">
                            <a href="#home" className="mobile-menu-link" onClick={(e) => handleNav(e, 'home')}>{t('header.home')}</a>
                            <a href="#about" className="mobile-menu-link" onClick={(e) => handleNav(e, 'about')}>{t('header.about')}</a>
                            <a href="#products" className="mobile-menu-link" onClick={(e) => handleNav(e, 'products')}>{t('header.products')}</a>
                            <a href="#order" className="mobile-menu-link" onClick={(e) => handleNav(e, 'order')}>{t('header.order')}</a>
                            <a href="#highlights" className="mobile-menu-link" onClick={(e) => handleNav(e, 'highlights')}>{t('header.highlights')}</a>
                            <a href="#contact" className="mobile-menu-link" onClick={(e) => handleNav(e, 'contact')}>{t('header.contact')}</a>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
