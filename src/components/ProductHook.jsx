import { Section } from "./Section";
import { useTranslation } from "react-i18next";
import imgHeroProduct from "../assets/img/productImg/prod2.png";

const ProductHook = ({ steps, currentProductHook }) => {
    const { t } = useTranslation();
    // Always take text from i18n so it switches languages; use provided icons if available.
    const ids = ["checkin", "dining", "sightseeing"];
    const defaultIcons = { checkin: "📸", dining: "🍽️", sightseeing: "🗺️" };
    const displaySteps = ids.map((id, i) => ({
        icon: (Array.isArray(steps) && steps[i]?.icon) || defaultIcons[id],
        title: t(`productHook.steps.${id}.title`),
        subtitle: t(`productHook.steps.${id}.subtitle`),
    }));
    return (
        <Section id="about" className="section product-hook-section">
            <div className="container">
                <div className="product-hook-content">
                    <div className="product-hook-image-container">
                        <div className="product-hook-image-wrapper">
                            <img
                                src={imgHeroProduct}
                                alt="Professional food brochure showcasing fresh salad with elegant layout design"
                                className="product-hook-image"
                            />

                            <div className="floating-element floating-element-1"></div>
                            <div className="floating-element floating-element-2"></div>
                        </div>
                    </div>

                    <div className="product-hook-text">
                        <h1 className="product-hook-title">
                            <span className="product-hook-title-accent">{t('productHook.title')}</span>
                        </h1>

                        <p className="product-hook-description">
                            {t('productHook.description')}
                        </p>

                        <div className="steps-container">
                            {displaySteps.map((step, index) => (
                                <div key={index} className="step">
                                    <div className="step-icon">{step.icon}</div>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-subtitle">{step.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ProductHook;
