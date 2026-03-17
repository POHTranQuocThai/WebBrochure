import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import { motion } from "framer-motion";

export default function ProductPolicy() {
    const { t } = useTranslation();

    const policies = [
        {
            icon: "📦",
            title: t("productPolicy.introduction.title"),
            description: t("productPolicy.introduction.description")
        },
        {
            icon: "🔄",
            title: t("productPolicy.exchange.title"),
            description: t("productPolicy.exchange.description")
        },
        {
            icon: "☎️",
            title: t("productPolicy.support.title"),
            description: t("productPolicy.support.description"),
            phone: "0921778895"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
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
        <Section id="policy" className="policy-section">
            <div className="section-container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t("productPolicy.title")}
                </motion.h2>

                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    {t("productPolicy.subtitle")}
                </motion.p>

                <motion.div
                    className="policies-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {policies.map((policy, index) => (
                        <motion.div
                            key={index}
                            className="policy-card"
                            variants={itemVariants}
                        >
                            <div className="policy-icon">{policy.icon}</div>
                            <h3 className="policy-title">{policy.title}</h3>
                            <p className="policy-description">{policy.description}</p>
                            {policy.phone && (
                                <div className="policy-phone">
                                    <strong>{t("productPolicy.hotline")}:</strong> {policy.phone}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
}
