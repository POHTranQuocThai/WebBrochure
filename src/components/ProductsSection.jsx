import { Section } from "./Section";
import ProductCarousel from "./ProductCarousel";

const ProductsSection = ({ products }) => {
    return (
        <Section id="highlights" className="section products-section">
            <div className="container">
                <h2 className="products-title">
                    <span className="products-title-accent">
                        What emotions do you want to experience with our guests?
                    </span>
                </h2>
                <ProductCarousel products={products} />
            </div>
        </Section>
    );
};

export default ProductsSection;
