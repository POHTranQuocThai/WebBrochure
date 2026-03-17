import { Section } from "./Section";
import { useTranslation } from "react-i18next";
import ProductCarousel from "./ProductCarousel";

const ProductsSection = ({ products }) => {
    const { t } = useTranslation();
    return (
        <Section className="section products-section" aria-labelledby="products-title">
            <div className="container">
                <h2 id="products-title" className="products-title">
                    <span className="products-title-accent">
                        {t('productsSection.title')}
                    </span>
                </h2>
                <ProductCarousel products={products} />
            </div>
        </Section>
    );
};

export default ProductsSection;
