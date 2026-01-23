import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { motion } from "framer-motion";

export default function ProductIntroduction() {
    const { t } = useTranslation();

    const features = [
        {
            icon: "📍",
            title: t("productIntroduction.feature1Title"),
            description: t("productIntroduction.feature1Desc")
        },
        {
            icon: "⭐",
            title: t("productIntroduction.feature2Title"),
            description: t("productIntroduction.feature2Desc")
        },
        {
            icon: "📱",
            title: t("productIntroduction.feature3Title"),
            description: t("productIntroduction.feature3Desc")
        },
        {
            icon: "🍽️",
            title: t("productIntroduction.feature4Title"),
            description: t("productIntroduction.feature4Desc")
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <Section id="introduction" className="introduction-section">
            <div className="section-container">
                <motion.div
                    className="introduction-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">{t("productIntroduction.title")}</h2>
                    <p className="section-subtitle">{t("productIntroduction.subtitle")}</p>
                </motion.div>

                <div className="introduction-content">
                    <motion.div
                        className="introduction-text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3>{t("productIntroduction.mainTitle")}</h3>
                        <p>{t("productIntroduction.mainDescription")}</p>
                        <ul className="product-highlights">
                            <li>{t("productIntroduction.highlight1")}</li>
                            <li>{t("productIntroduction.highlight2")}</li>
                            <li>{t("productIntroduction.highlight3")}</li>
                            <li>{t("productIntroduction.highlight4")}</li>
                        </ul>
                    </motion.div>


                </div>

                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} className="feature-item" variants={itemVariants}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
}
