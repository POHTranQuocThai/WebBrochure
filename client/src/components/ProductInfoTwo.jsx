import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import imgProduct1 from "../assets/img/productImg/prod3.jpg";

const ProductInfoTwo = () => {
    const { t } = useTranslation();
    // traveler removed; keep only path id for potential future use
    // Path id to reference in motionPath
    const pathId = useMemo(() => `travel-path-${Math.random().toString(36).slice(2)}`, []);
    return (
        <Section className="section product-section-2" style={{ background: 'linear-gradient(135deg, rgba(192, 230, 186, 0.3), rgba(76, 167, 113, 0.2))' }}>
            <div className="container">
                <div className="product-content staggered">
                    {/* Swap: Text on the left */}
                    <div className="product-info-container stagger-left-up">
                        <div className="product-info-wrapper cloudy">
                            <div className="cloud-card">
                                <div className="cloud-content">
                                    <h3 className="product-title">
                                        <span className="product-title-accent">{t('products.back.title')}</span>
                                    </h3>

                                    <p className="product-description">
                                        {t('products.back.description')}
                                    </p>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Swap: Image on the right */}
                    <div className="product-image-container stagger-right-down">
                        <div className="product-image-wrapper">
                            <div className="cloud-frame">

                                <img
                                    src={imgProduct1}
                                    alt="Mặt sau của sản phẩm"
                                    className="product-image clouded"
                                />
                            </div>

                            <div className="floating-element" style={{ top: '-12px', right: '-12px', width: '24px', height: '24px', background: 'var(--color-dark-teal)' }}></div>
                            <div className="floating-element" style={{ bottom: '-8px', left: '-8px', width: '16px', height: '16px', background: 'var(--color-primary-green)' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-decoration" style={{ top: '80px', right: '80px', fontSize: '96px', color: 'var(--color-primary-green)' }}>🌿</div>

            <div className="travel-path-wrap" style={{ '--travel-tilt': '-15deg' }}>
                <div className="travel-viewport">
                    {/* Travel path overlay (visual) */}
                    <svg
                        className="travel-path-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 800 800"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                    >
                        {/* S-shaped path splitting the section roughly in half vertically */}
                        <defs>
                            {/* Modern gradient for road surface */}
                            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4a5568" stopOpacity="0.95" />
                                <stop offset="50%" stopColor="#2d3748" stopOpacity="1" />
                                <stop offset="100%" stopColor="#1a202c" stopOpacity="0.95" />
                            </linearGradient>
                            {/* Subtle texture overlay */}
                            <filter id="roadTexture" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" result="noise" />
                                <feColorMatrix type="saturate" values="0" />
                                <feComponentTransfer>
                                    <feFuncA type="table" tableValues="0 0.08" />
                                </feComponentTransfer>
                                <feBlend in2="SourceGraphic" mode="overlay" />
                            </filter>
                            {/* Glow effect for modern look */}
                            <filter id="roadGlow">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        {/* Road: modern gradient road with sleek design */}
                        <g className="road-group">
                            {/* Outer glow for depth */}
                            <path
                                d="M 350 80 C 600 180, 200 300, 450 420 C 700 520, 250 640, 500 760"
                                fill="none"
                                strokeWidth="52"
                                strokeLinecap="round"
                                className="road-glow"
                            />
                            {/* Main road surface with gradient */}
                            <path
                                id={pathId}
                                d="M 350 80 C 600 180, 200 300, 450 420 C 700 520, 250 640, 500 760"
                                fill="none"
                                stroke="url(#roadGradient)"
                                strokeWidth="44"
                                strokeLinecap="round"
                                filter="url(#roadTexture)"
                                className="road-base"
                            />
                            {/* Side white lines for modern highway look */}
                            <path
                                d="M 350 80 C 600 180, 200 300, 450 420 C 700 520, 250 640, 500 760"
                                fill="none"
                                strokeWidth="46"
                                strokeLinecap="round"
                                strokeDasharray="0 4"
                                className="road-sidelines"
                            />
                            {/* Center dashed line - bright white */}
                            <path
                                d="M 350 80 C 600 180, 200 300, 450 420 C 700 520, 250 640, 500 760"
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="24 18"
                                className="road-center"
                            />
                        </g>

                        {/* Invisible path duplicate for potential future JS sampling */}
                        <use href={`#${pathId}`} visibility="hidden" />
                    </svg>
                    {/* traveler removed as requested */}
                </div>
            </div>
        </Section>
    );
};

export default ProductInfoTwo;
