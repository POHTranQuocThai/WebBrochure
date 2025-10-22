import { Section } from "./Section";
import imgHeroProduct from "../assets/img/productImg/prod2.png";

const ProductHook = ({ steps, currentProductHook }) => {
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
                            <span className="product-hook-title-accent"> Eatery Guide</span>
                        </h1>

                        <p className="product-hook-description">
                            Discover about about the best food in your life and always remember our
                            chef-prepared, nutritionally balanced salads specially made for you
                        </p>

                        <div className="steps-container">
                            {steps.map((step, index) => (
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
