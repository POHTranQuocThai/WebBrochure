import { motion } from "framer-motion";

export const Section = ({ id, children, className }) => (
    <motion.section
        id={id}
        className={className || "section"}
        initial={{ opacity: 0, y: "30%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circInOut" }}
        viewport={{ once: false, amount: 0 }}
    >
        {children}
    </motion.section>

);