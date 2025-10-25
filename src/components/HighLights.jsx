import { Section } from "./Section";
import { useTranslation } from "react-i18next";
import ProductCarousel from "./ProductCarousel";
import { Marquee3D } from "./ReviewCard";

const HighLights = ({ products }) => {
    const { t } = useTranslation();
    return (
        <Section id='highlights' className="section highlights-section" aria-labelledby="highlights-title">
            <h2 id="highlights-title" className="highlights-title">
                <span className="highlights-title-accent">
                    {t('highlightsSection.title')}
                </span>
            </h2>
            <Marquee3D />
        </Section>
    );
};

export default HighLights;
