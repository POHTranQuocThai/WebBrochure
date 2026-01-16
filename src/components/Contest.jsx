import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";

// Helper to format VND without decimals
const formatVND = (value) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);

const Contest = ({ baseHours = 48, oldPrice = 99000, newPrice = 49000 }) => {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const endRef = useRef(null);

    useEffect(() => {
        // Set end time to now + baseHours hours on first mount
        endRef.current = Date.now() + baseHours * 60 * 60 * 1000;

        const tick = () => {
            const diff = Math.max(0, endRef.current - Date.now());
            const totalSeconds = Math.floor(diff / 1000);
            const hours = Math.floor(totalSeconds / 3600); // tổng giờ còn lại (48h -> 47h ...)
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            setTimeLeft({ hours, minutes, seconds });
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [baseHours]);

    const handleContactClick = () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <Section id="order" className="section contest-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="contest-title">
                        <span className="contest-title-accent">{t('contest.title')}</span>
                    </h2>

                    <p className="contest-subtitle">{t('contest.subtitle')}</p>

                    <div className="countdown-container">
                        {[
                            { value: timeLeft.hours, label: t('contest.hours') },
                            { value: timeLeft.minutes, label: t('contest.minutes') },
                            { value: timeLeft.seconds, label: t('contest.seconds') }
                        ].map((item) => (
                            <div key={item.label} className="countdown-item">
                                <div className="countdown-number">{String(item.value ?? 0).padStart(2, '0')}</div>
                                <div className="countdown-label">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="price-section"
                        style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <div className="flash-badge" aria-hidden="true" title={t('contest.title')}>
                            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">
                                <defs>
                                    <linearGradient id="flashGrad" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="var(--color-medium-red)" />
                                        <stop offset="100%" stopColor="var(--color-primary-red)" />
                                    </linearGradient>
                                </defs>
                                <polygon points="32,2 38,16 54,16 41,26 46,40 32,32 18,40 23,26 10,16 26,16"
                                    fill="url(#flashGrad)" stroke="var(--color-light-beige)" strokeWidth="2" />
                                <text x="32" y="35" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--color-sand)">SALE</text>
                            </svg>
                        </div>
                        <span
                            className="price"
                            style={{
                                marginRight: 0,
                                fontSize: 'clamp(2rem, 6vw, 3rem)',
                                textShadow: '0 2px 12px rgba(var(--color-primary-red-rgb), 0.28)'
                            }}
                        >
                            {formatVND(newPrice)}
                        </span>
                        <span className="old-price" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                            {formatVND(oldPrice)}
                        </span>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleContactClick}
                            aria-label={t('contest.contactNow')}
                            style={{ paddingInline: 28 }}
                        >
                            {t('contest.contactNow')}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-decoration" style={{ top: '80px', left: '80px', fontSize: '80px', color: 'var(--color-primary-red)', opacity: '0.15' }}>🌿</div>
            <div className="bg-decoration" style={{ bottom: '128px', right: '128px', fontSize: '64px', color: 'var(--color-dark-green)', opacity: '0.2' }}>✨</div>
        </Section>
    );
};

export default Contest;
