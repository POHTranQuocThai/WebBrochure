import LanguageToggle from "./LanguageToggle";
import Logo from "../assets/img/logo5.png";

const Header = ({ t, activeSection, isHeaderFixed }) => {
    const handleNav = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        // Use CSS scroll-margin-top on sections for consistent offset under fixed header
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    };

    return (
        <header className={`header ${isHeaderFixed ? "header-fixed" : "header-normal"}`}>
            <div className="language-toggle">
                <LanguageToggle />
            </div>
            <div className="container">
                <nav className="nav">
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
            </div>
        </header>
    );
};

export default Header;
