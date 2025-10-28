import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "../assets/css/carousel.css";
import logo from "../assets/img/logo5.png";
import { useTranslation } from "react-i18next";

// Book-style carousel using react-pageflip
export default function ProductCarousel({ products = [] }) {
    const { t } = useTranslation();
    const flipBookRef = useRef(null);
    const [current, setCurrent] = useState(0);
    const currentRef = useRef(0);
    const stateRef = useRef("read"); // pageflip state
    const hoveredRef = useRef(false);
    const intervalRef = useRef(null);

    const n = products?.length || 0;
    // Pages: [insideFront, cover, ...products, backCover, (optional insideBack to avoid blank)]
    const needsInsideBack = ((n + 3) % 2) === 1; // ensure even total in landscape
    const totalPages = n + 3 + (needsInsideBack ? 1 : 0);

    useEffect(() => {
        currentRef.current = current;
    }, [current]);

    // Helpers to control autoplay
    const stopAutoplay = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        intervalRef.current = setInterval(() => {
            const api = flipBookRef.current?.pageFlip?.();
            if (!api) return;
            // Skip flipping while user interacting or currently flipping
            if (hoveredRef.current || stateRef.current !== "read") return;
            const idx = currentRef.current;
            if (idx >= totalPages - 1) {
                try { api.flip(0, "bottom"); } catch { }
            } else {
                try { api.flipNext("bottom"); } catch { }
            }
        }, 3000);
    };

    // Init/cleanup autoplay, restart when number of pages changes
    useEffect(() => {
        startAutoplay();
        return () => stopAutoplay();
    }, [totalPages]);

    // Pause when tab is hidden to avoid desync
    useEffect(() => {
        const onVis = () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        };
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    return (
        <div
            className="flipbook-container"
            aria-label="Product flipbook carousel"
            onMouseEnter={() => { hoveredRef.current = true; }}
            onMouseLeave={() => { hoveredRef.current = false; }}
            onTouchStart={() => { hoveredRef.current = true; }}
            onTouchEnd={() => { hoveredRef.current = false; }}
        >
            <HTMLFlipBook
                className="flipbook"
                ref={flipBookRef}
                width={420}
                height={560}
                size="stretch"
                minWidth={280}
                maxWidth={900}
                minHeight={360}
                maxHeight={1200}
                drawShadow={true}
                maxShadowOpacity={0.8}
                flippingTime={650}
                usePortrait={true}
                showCover={false}
                autoSize={true}
                swipeDistance={15}
                mobileScrollSupport={false}
                onFlip={(e) => setCurrent(e.data)}
                onChangeState={(e) => { stateRef.current = e.data; }}
            >
                {/* Inside Front (to avoid blank left page on first spread) */}
                <div className="flip-page flip-inside" aria-label="Inside front">
                    <div className="flip-cover-inner">
                        <div className="flip-inside-title">{t('flipbook.insideTitle')}</div>
                        {(() => {
                            const body = t('flipbook.insideBody');
                            const sentences = body.split(/(?<=[.!?])\s+/);
                            const mid = Math.ceil(sentences.length / 2);
                            const paras = [
                                sentences.slice(0, mid).join(' ').trim(),
                                sentences.slice(mid).join(' ').trim(),
                            ].filter(Boolean);
                            return paras.map((p, i) => (
                                <p className="flip-inside-text" key={`inside-front-p-${i}`}>{p}</p>
                            ));
                        })()}
                    </div>
                </div>

                {/* Front Cover */}
                <div className="flip-page flip-cover" aria-label="Front cover">
                    <div className="flip-cover-inner">
                        <img src={logo} alt="logo" className="flip-logo" />
                        <div className="flip-brand">{t('flipbook.coverTitle')}</div>
                        <div className="flip-subtitle">{t('flipbook.coverSubtitle')}</div>
                    </div>
                </div>

                {/* Content pages */}
                {products.map((p, idx) => (
                    <div className="flip-page" key={idx} aria-label={`Page ${idx + 1}: ${p?.name ?? "Product"}`}>
                        <img src={p.image} alt={p.name || `Product ${idx + 1}`} />
                        {p?.name && (
                            <div className="flip-caption">
                                <span>{p.name}</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Back Cover */}
                <div className="flip-page flip-backcover" aria-label="Back cover">
                    <div className="flip-cover-inner">
                        <div className="flip-brand">{t('flipbook.backTitle')}</div>
                        <div className="flip-subtitle">{t('flipbook.backSubtitle')}</div>
                    </div>
                </div>

                {/* Inside Back (optional, to avoid blank last page) */}
                {needsInsideBack && (
                    <div className="flip-page flip-inside" aria-label="Inside back">
                        <div className="flip-cover-inner">
                            <div className="flip-inside-title">{t('flipbook.insideBackTitle')}</div>
                            <p className="flip-inside-text">{t('flipbook.insideBackBody')}</p>
                            <a
                                href="#contact"
                                aria-label={t('contest.contactNow')}
                                className="btn btn-primary flip-inside-cta mt-24"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="flip-cta-icon"
                                    aria-hidden="true"
                                >
                                    <path d="M2.25 6.75A2.25 2.25 0 014.5 4.5h3.379c.621 0 1.167.39 1.342.981l.84 2.802a1.35 1.35 0 01-.337 1.312l-1.32 1.32a15.935 15.935 0 006.9 6.9l1.32-1.32c.35-.35.864-.48 1.312-.337l2.802.84c.59.175.981.721.981 1.342V19.5a2.25 2.25 0 01-2.25 2.25H18c-8.284 0-15-6.716-15-15v-.75z" />
                                </svg>
                                <span>{t('contest.contactNow')}</span>
                            </a>
                            <div className="flip-cta-hint" aria-live="polite">{t('flipbook.ctaHint')}</div>
                        </div>
                    </div>
                )}
            </HTMLFlipBook>

        </div>
    );
}
