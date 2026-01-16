import React, { useEffect, useState } from 'react';

const icons = {
    facebook: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 4.94 3.62 9.05 8.36 9.88v-6.99H7.84v-2.9h2.4V9.83c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.12.18 2.12.18v2.32h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22v6.99c4.74-.83 8.36-4.94 8.36-9.88Z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6.2A4.8 4.8 0 1 0 16.8 13 4.81 4.81 0 0 0 12 8.2Zm6.1-.9a1.2 1.2 0 1 0-1.2-1.2 1.2 1.2 0 0 0 1.2 1.2ZM12 9.8A3.2 3.2 0 1 1 8.8 13 3.2 3.2 0 0 1 12 9.8Z" />
        </svg>
    ),
    tiktok: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="currentColor"
        >
            <path d="M12.5 2c.6 2.8 2.7 5 5.5 5.3v2.1a7.9 7.9 0 0 1-5.1-1.7v7.2a5.8 5.8 0 1 1-5.8-5.8c.2 0 .5 0 .7.02v2.2a3.6 3.6 0 1 0 2.9 3.5V2h1.8Z" />
        </svg>
    ),
    phone: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M6.6 10.8a13.6 13.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.1-.23 11.2 11.2 0 0 0 3.5.56 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.6 17.6 0 0 1 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.2 11.2 0 0 0 .56 3.5 1 1 0 0 1-.23 1.1Z" />
        </svg>
    ),
    zalo: (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M4 3h16a1 1 0 0 1 1 1v12.8a1 1 0 0 1-1.6.8L16 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2.5 9H8l2.5-6H9L6.5 12Zm6.7-6h-1.2v6h1.2V6Zm3.8 0H16v6h3.2v-1H17.8V6Z" />
        </svg>
    )
};

export default function SocialFloat() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(en => setHidden(en.isIntersecting));
        }, { threshold: 0.1 });
        io.observe(footer);
        return () => io.disconnect();
    }, []);
    const zaloLink =
        /Android|iPhone/i.test(navigator.userAgent)
            ? 'https://zalo.me/0838276277'
            : 'https://zalo.me/0838276277';

    return (
        <div className={`social-float ${hidden ? 'hidden' : ''}`} aria-hidden={hidden}>
            <a target='_blank' href="https://www.facebook.com/profile.php?id=61582625240262&locale=vi_VN" className="social-item fb" aria-label="Facebook">
                <span className="social-icon" aria-hidden>{icons.facebook}</span>
                <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="social-item tk" aria-label="TikTok">
                <span className="social-icon" aria-hidden>{icons.tiktok}</span>
                <span className="sr-only">TikTok</span>
            </a>
            <a
                href={zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item phone"
                aria-label="Chat Zalo"
            >
                <span className="social-icon" aria-hidden>{icons.phone}</span>
                <span className="sr-only">Zalo</span>
            </a>
        </div>
    );
}
