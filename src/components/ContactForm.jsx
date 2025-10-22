import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
    const { t } = useTranslation();
    const ref = useRef();
    const [form, setForm] = useState({ name: '', email: '', phone: '' });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) el.classList.add('reveal');
            });
        }, { threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = t('contact.errors.nameRequired');
        if (!/^[\w-.]+@[\w-]+(\.[\w-]+)+$/.test(form.email)) e.email = t('contact.errors.emailInvalid');
        if (!/^\+?[0-9\s-]{8,}$/.test(form.phone)) e.phone = t('contact.errors.phoneInvalid');
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        if (!validate()) return;
        // Placeholder submit: integrate with backend later
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    }

    return (
        <section id="contact" className="section revealable contact-section" ref={ref}>
            <div className="container contact-wrap">
                <div className="contact-card">
                    <h2 className="section-title">{t('contact.title')}</h2>
                    <p className="lead">{t('contact.lead')}</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="contact-grid">
                            <label className={`input-group ${errors.name ? 'has-error' : ''}`}>
                                <span>{t('contact.nameLabel')}</span>
                                <input
                                    placeholder={t('contact.namePlaceholder')}
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                                <div className="field-error">{errors.name}</div>
                            </label>
                            <label className={`input-group ${errors.email ? 'has-error' : ''}`}>
                                <span>{t('contact.emailLabel')}</span>
                                <input
                                    type="email"
                                    placeholder={t('contact.emailPlaceholder')}
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                                <div className="field-error">{errors.email}</div>
                            </label>
                            <label className={`input-group ${errors.phone ? 'has-error' : ''}`}>
                                <span>{t('contact.phoneLabel')}</span>
                                <input
                                    type="tel"
                                    placeholder={t('contact.phonePlaceholder')}
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                />
                                <div className="field-error">{errors.phone}</div>
                            </label>
                        </div>
                        <div className="contact-actions">
                            <button className="btn-primary" type="submit" disabled={sent}>
                                {sent ? t('contact.sent') : t('contact.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
