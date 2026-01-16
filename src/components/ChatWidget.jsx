import { useMemo, useRef, useState, useEffect } from 'react';
import logo from '../assets/img/logo5.png';

const ChatIcon = ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M20 4H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3v3.5c0 .45.54.67.85.35L11.7 17H20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const CloseIcon = ({ className = 'w-5 h-5' }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const MINIMIZED_KEY = 'chat_widget_minimized_v1';

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(() => [
        { id: 'greet', from: 'bot', text: 'Chào bạn 👋 Mình là trợ lý tư vấn. Bạn cần hỗ trợ gì hôm nay?' }
    ]);
    const [input, setInput] = useState('');
    const [step, setStep] = useState(1);
    const [hiddenOptions, setHiddenOptions] = useState([]);
    const [chatLang, setChatLang] = useState('vi');

    const CHAT_CONFIG = useMemo(() => ({
        productName: 'Brochure',
        problemMain: 'vấn đề không biết ăn gì, đi đâu khi lần đầu đặt chân tới Cần Thơ',
        timeToResult: 'trong thời gian ngắn và tiết kiệm được nhiều thời gian không phải tìm hiểu quá nhiều qua các trang thông tin khác!',
        price: '49.000 đ',
        phone: '0838276277',
        zalo: 'https://zalo.me/0838276277',
        facebook: 'https://www.facebook.com/profile.php?id=61582625240262&locale=vi_VN',
    }), []);

    const bottomRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem(MINIMIZED_KEY);
        if (saved === 'open') setOpen(true);
    }, []);

    useEffect(() => {
        localStorage.setItem(MINIMIZED_KEY, open ? 'open' : 'closed');
    }, [open]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, open]);

    const getOptionsForStep = (s) => {
        if (chatLang === 'en') {
            switch (s) {
                case 1:
                    return [
                        { key: 'intro', label: 'Quick introduction' },
                        { key: 'price', label: 'Price & deals' },
                        { key: 'fit', label: 'Is this a good fit?' },
                        { key: 'buy', label: 'How to buy' },
                    ];
                case 2:
                    return [
                        { key: 'details', label: 'Product details' },
                        { key: 'today_price', label: 'Today’s price & deals' },
                    ];
                case 3:
                    return [
                        { key: 'compare', label: 'Compare with others' },
                        { key: 'buy_now', label: 'Buy now' },
                        { key: 'contact_quick', label: 'Quick contact' },
                    ];
                case 4:
                    return [
                        { key: 'fit_me', label: 'Is it right for me?' },
                        { key: 'warranty', label: 'Warranty / after-sales' },
                        { key: 'shipping', label: 'Shipping details' },
                    ];
                case 5:
                    return [
                        { key: 'call', label: `Hotline: ${CHAT_CONFIG.phone}` },
                        { key: 'zalo', label: '💬 Zalo' },
                        { key: 'facebook', label: '📘 Fanpage' },
                        { key: 'order_flow', label: 'Contact via email' },
                    ];
                default:
                    return [];
            }
        }
        switch (s) {
            case 1:
                return [
                    { key: 'intro', label: 'Giới thiệu nhanh' },
                    { key: 'price', label: 'Giá & ưu đãi' },
                    { key: 'fit', label: 'Sản phẩm có phù hợp không?' },
                    { key: 'buy', label: 'Cách mua' },
                ];
            case 2:
                return [
                    { key: 'details', label: 'Chi tiết sản phẩm' },
                    { key: 'today_price', label: 'Giá & ưu đãi hôm nay' },
                ];
            case 3:
                return [
                    { key: 'compare', label: 'So với sản phẩm khác' },
                    { key: 'buy_now', label: 'Cách mua ngay' },
                    { key: 'contact_quick', label: 'Liên hệ tư vấn nhanh' },
                ];
            case 4:
                return [
                    { key: 'fit_me', label: 'Có phù hợp với tôi không?' },
                    { key: 'warranty', label: 'Bảo hành / hậu mãi' },
                    { key: 'shipping', label: 'Giao hàng thế nào?' },
                ];
            case 5:
                return [
                    { key: 'call', label: `Liên hệ Hotline: ${CHAT_CONFIG.phone}` },
                    { key: 'zalo', label: '💬 Zalo' },
                    { key: 'facebook', label: '📘 Fanpage' },
                    { key: 'order_flow', label: 'Liên hệ qua mail' },
                ];
            default:
                return [];
        }
    };

    const getAnswersForLang = (lang) => {
        if (lang === 'en') {
            return {
                product: {
                    html: `
                        <p><strong>${CHAT_CONFIG.productName}</strong> is our in-house guide that helps you quickly explore food & check-in spots in Can Tho.</p>
                        <p>Easy to read, visual, and saves your search time.</p>
                    `
                },
                price: {
                    html: `
                        <p><strong>Current price:</strong> ${CHAT_CONFIG.price}</p>
                        <p>New customers get an <em>instant 10% off</em> on the first order.</p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                          <li>Warranty</li>
                          <li>Support</li>
                          <li>Return if defective</li>
                        </ul>
                    `
                },
                howto: {
                    html: `
                        <p><strong>How to buy</strong></p>
                        <ol class="list-decimal list-outside pl-5 space-y-1">
                          <li>Choose the product</li>
                          <li>Click Order / Contact</li>
                          <li>Fill delivery information</li>
                        </ol>
                        <p>Or leave your phone number; our team will contact you quickly.</p>
                    `
                },
                contact: {
                    html: `
                        <p>You can contact us via:</p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                          <li>Hotline: <strong>${CHAT_CONFIG.phone}</strong></li>
                          <li>Zalo: <a href="${CHAT_CONFIG.zalo}" target="_blank" rel="noopener">Open Zalo</a></li>
                        </ul>
                        <p>We respond during business hours.</p>
                    `
                },
            };
        }
        return {
            product: {
                html: `
                    <p><strong>${CHAT_CONFIG.productName}</strong> được bên mình tự phát triển để giúp bạn khám phá ẩm thực & điểm check-in tại Cần Thơ nhanh chóng.</p>
                    <p>Nội dung dễ xem, trực quan và tiết kiệm thời gian tìm kiếm.</p>
                `
            },
            price: {
                html: `
                    <p><strong>Giá hiện tại:</strong> ${CHAT_CONFIG.price}</p>
                    <p>Nếu là lần đầu mua, bạn sẽ được <em>giảm trực tiếp 10%</em> cho đơn đầu tiên.</p>
                    <ul class="list-disc list-outside pl-5 space-y-1">
                      <li>Bảo hành</li>
                      <li>Hỗ trợ</li>
                      <li>Đổi trả nếu có lỗi</li>
                    </ul>
                `
            },
            howto: {
                html: `
                    <p><strong>Cách mua hàng</strong></p>
                    <ol class="list-decimal list-outside pl-5 space-y-1">
                      <li>Chọn sản phẩm</li>
                      <li>Nhấn Đặt hàng / Liên hệ</li>
                      <li>Điền thông tin nhận hàng</li>
                    </ol>
                    <p>Hoặc để lại số điện thoại, bên mình sẽ liên hệ hỗ trợ nhanh.</p>
                `
            },
            contact: {
                html: `
                    <p>Bạn có thể liên hệ nhanh qua:</p>
                    <ul class="list-disc list-outside pl-5 space-y-1">
                      <li>Hotline: <strong>${CHAT_CONFIG.phone}</strong></li>
                      <li>Zalo: <a href="${CHAT_CONFIG.zalo}" target="_blank" rel="noopener">Mở Zalo</a></li>
                    </ul>
                    <p>Đội ngũ sẽ phản hồi trong giờ làm việc.</p>
                `
            },
        };
    };

    const composeStepMessage = (s, lang = chatLang) => {
        if (lang === 'en') {
            if (s === 1) {
                return {
                    html: `
                        <p><strong>Hello 👋</strong></p>
                        <p>I’ll help you quickly learn about <strong>${CHAT_CONFIG.productName}</strong>!</p>
                    `
                };
            }
            if (s === 2) {
                return {
                    html: `
                        <p><strong>${CHAT_CONFIG.productName}</strong> is our exclusive product.</p>
                        <p>It helps you solve <em>${CHAT_CONFIG.problemMain}</em> ${CHAT_CONFIG.timeToResult}.</p>
                    `
                };
            }
            if (s === 3) {
                return {
                    html: `
                        <p><strong>Current price:</strong> ${CHAT_CONFIG.price}</p>
                        <p>New customers get 10% off on the first order.</p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                          <li>Warranty</li>
                          <li>Support</li>
                          <li>Return if defective</li>
                        </ul>
                    `
                };
            }
            if (s === 4) {
                return { html: '<p><strong>What are you wondering?</strong></p>' };
            }
            if (s === 5) {
                return { html: '<p>For fastest support, you can:</p>' };
            }
            return { html: '' };
        }
        if (s === 1) {
            return {
                html: `
                    <p><strong>Chào bạn 👋</strong></p>
                    <p>Mình giúp bạn tìm hiểu nhanh sản phẩm <strong>${CHAT_CONFIG.productName}</strong> bên mình nhé!</p>
                `
            };
        }
        if (s === 2) {
            return {
                html: `
                    <p><strong>${CHAT_CONFIG.productName}</strong> là sản phẩm độc quyền do bên mình tự phát triển.</p>
                    <p>Giúp bạn giải quyết <em>${CHAT_CONFIG.problemMain}</em> chỉ ${CHAT_CONFIG.timeToResult}.</p>
                `
            };
        }
        if (s === 3) {
            return {
                html: `
                    <p><strong>Giá hiện tại:</strong> ${CHAT_CONFIG.price}</p>
                    <p>Khách mới được giảm 10% cho đơn đầu tiên.</p>
                    <ul class="list-disc list-outside pl-5 space-y-1">
                      <li>Bảo hành</li>
                      <li>Hỗ trợ</li>
                      <li>Đổi trả nếu có lỗi</li>
                    </ul>
                `
            };
        }
        if (s === 4) {
            return { html: '<p><strong>Bạn đang băn khoăn điều gì?</strong></p>' };
        }
        if (s === 5) {
            return { html: '<p>Để được hỗ trợ nhanh nhất, bạn có thể:</p>' };
        }
        return { html: '' };
    };

    useEffect(() => {
        // reset first message based on step when opening
        if (open) {
            const msg = composeStepMessage(step, chatLang);
            setMessages([{ id: `step-${step}`, from: 'bot', ...(typeof msg === 'string' ? { text: msg } : msg) }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        // when the step changes, show options again
        setHiddenOptions([]);
    }, [step]);
    const handleOption = (key, label) => {
        const push = (botText, nextStep) => {
            setMessages(prev => ([
                ...prev,
                { id: Date.now() + '-u', from: 'user', text: label },
                { id: Date.now() + '-b', from: 'bot', ...(typeof botText === 'string' ? { text: botText } : botText) }
            ]));
            if (nextStep) setStep(nextStep);
        };

        setHiddenOptions(prev => (prev.includes(key) ? prev : [...prev, key]));

        switch (key) {
            case 'intro':
                return push(composeStepMessage(2, chatLang), 2);
            case 'price':
                return push(composeStepMessage(3, chatLang), 3);
            case 'fit':
                return push(composeStepMessage(4, chatLang), 4);
            case 'buy':
                return push(composeStepMessage(5, chatLang), 5);
            case 'details':
                return push(chatLang === 'en' ? {
                    html: `
                        <p><strong>Detailed introduction</strong></p>
                        <p>Brochure is a map-like guide to food & check-in experiences in Can Tho.</p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                            <li>10 local-authentic eateries suitable for everyone.</li>
                            <li>6 scenic coffee shops — perfect for photo check-ins.</li>
                            <li>Each place has a QR: scan to see directions instantly.</li>
                        </ul>
                        <p>Helps you save search time and enjoy your trip fully.</p>
                    `
                } : {
                    html: `
                        <p><strong>Giới thiệu chi tiết</strong></p>
                        <p>Brochure là một tấm bản đồ trải nghiệm ẩm thực & check-in tại Cần Thơ.</p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                            <li>10 quán ăn chuẩn vị địa phương, chất lượng phù hợp mọi đối tượng.</li>
                            <li>6 quán coffee phong cảnh siêu đẹp, lý tưởng để chụp ảnh check-in.</li>
                            <li>Mỗi địa điểm đều có mã QR: quét là xem ngay đường đi tới địa điểm đó.</li>
                        </ul>
                        <p>Giúp bạn tiết kiệm thời gian tìm kiếm và tận hưởng trọn vẹn chuyến đi.</p>
                    `
                });
            case 'today_price':
                return push(composeStepMessage(3, chatLang), 3);
            case 'compare':
                return push(chatLang === 'en' ? {
                    html: `
                        <p><strong>Quick comparison</strong></p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                          <li>Curated content, ideal for first-time visits to Can Tho.</li>
                          <li>Visual with QR per place for fast navigation.</li>
                          <li>After-sales support if any issue arises.</li>
                        </ul>
                    `
                } : {
                    html: `
                        <p><strong>So sánh nhanh</strong></p>
                        <ul class="list-disc list-outside pl-5 space-y-1">
                          <li>Nội dung chọn lọc, phù hợp đi lần đầu tại Cần Thơ.</li>
                          <li>Trực quan với QR từng địa điểm để di chuyển nhanh.</li>
                          <li>Hậu mãi & hỗ trợ nếu có vấn đề trong quá trình sử dụng.</li>
                        </ul>
                    `
                });
            case 'buy_now':
                {
                    const text = chatLang === 'en'
                        ? 'You can buy now by leaving your info at Contact or tap Call/Zalo for quick support.'
                        : 'Bạn có thể đặt mua ngay bằng cách để lại thông tin tại mục Liên hệ hoặc nhấn Gọi/Zalo để trao đổi nhanh.';
                    push(text, 5);
                    const el = document.getElementById('contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            case 'contact_quick':
                return push(chatLang === 'en'
                    ? `You can call ${CHAT_CONFIG.phone} or message via Zalo for instant support.`
                    : `Bạn có thể gọi ${CHAT_CONFIG.phone} hoặc nhắn Zalo để được hỗ trợ ngay.`);
            case 'fit_me':
                return push(chatLang === 'en'
                    ? 'Fit: If you are looking to solve ' + CHAT_CONFIG.problemMain + ', this product is a great fit. I can advise more based on your needs.'
                    : 'Phù hợp: Nếu bạn đang tìm giải pháp cho ' + CHAT_CONFIG.problemMain + ', sản phẩm này rất phù hợp. Mình có thể tư vấn thêm theo nhu cầu của bạn.');
            case 'warranty':
                return push(chatLang === 'en'
                    ? 'Warranty / after-sales: We support warranty per policy, returns if defective, and post-purchase assistance.'
                    : 'Bảo hành / hậu mãi: Bên mình hỗ trợ bảo hành theo chính sách, đổi trả nếu lỗi và tư vấn sau bán hàng.');
            case 'shipping':
                return push(chatLang === 'en'
                    ? 'Shipping: Nationwide delivery, 1-3 days depending on area. Inspection on delivery supported.'
                    : 'Giao hàng: Giao toàn quốc, thời gian 1-3 ngày tùy khu vực. Có hỗ trợ kiểm tra khi nhận.');
            case 'call':
                window.open(`tel:${CHAT_CONFIG.phone}`);
                return push(chatLang === 'en' ? 'You can tap to call now.' : 'Bạn có thể ấn vào để gọi ngay.');
            case 'zalo':
                window.open(CHAT_CONFIG.zalo, '_blank');
                return push(chatLang === 'en' ? 'I’ve opened Zalo for quick contact.' : 'Mình đã mở Zalo để bạn liên hệ nhanh.');
            case 'facebook':
                window.open(CHAT_CONFIG.facebook, '_blank');
                return push(chatLang === 'en' ? 'I’ve opened our Fanpage for quick contact.' : 'Mình đã mở Fanpage để bạn liên hệ nhanh.');
            case 'order_flow':
                {
                    const html = chatLang === 'en' ? `
                        <p><strong>Order flow</strong></p>
                        <ol class="list-decimal list-outside pl-5 space-y-1">
                          <li>Choose product</li>
                          <li>Contact / Place order</li>
                          <li>Order confirmation</li>
                          <li>Delivery</li>
                        </ol>
                    ` : `
                        <p><strong>Flow mua hàng</strong></p>
                        <ol class="list-decimal list-outside pl-5 space-y-1">
                          <li>Chọn sản phẩm</li>
                          <li>Liên hệ / Đặt mua</li>
                          <li>Xác nhận đơn</li>
                          <li>Giao hàng</li>
                        </ol>
                    `;
                    push({ html });
                    const el = document.getElementById('contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            default:
                return push(chatLang === 'en' ? 'I don’t have info for this yet; please try another option!' : 'Mình chưa có thông tin cho mục này, bạn thử chọn mục khác nhé!');
        }
    };

    const normalize = (s) => s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    const detectIntent = (text) => {
        const t = normalize(text);

        const keywords = {
            product: [
                'san pham', 'sanpham', 'gioi thieu', 'chi tiet', 'thanh phan', 'nguyen lieu', 'mo ta', 'thong tin',
                'product', 'products', 'intro', 'introduction', 'details', 'spec', 'specs', 'information'
            ],
            price: [
                'gia', 'gia ca', 'bao nhieu', 'uu dai', 'khuyen mai', 'gia tien', 'bang gia', 'gia ban',
                'price', 'cost', 'pricing', 'how much', 'discount', 'deal', 'promotion'
            ],
            howto: [
                'mua', 'mua hang', 'mua san pham', 'dat hang', 'cach mua', 'thanh toan', 'tra tien', 'ship', 'giao hang', 'dat mua', 'dat san pham',
                'buy', 'purchase', 'order', 'checkout', 'how to buy', 'how can i buy', 'place order', 'payment', 'pay', 'shipping', 'deliver', 'delivery'
            ],
            contact: [
                'lien he', 'so dien thoai', 'sdt', 'zalo', 'facebook', 'fanpage', 'hotline', 'goi',
                'contact', 'call', 'phone', 'zalo', 'facebook', 'fanpage', 'hotline'
            ],
        };

        const patterns = {
            howto: [
                /how\s*(to|do\s*i)\s*(buy|purchase|order)/,     // "how to buy"
                /(cach|cách)\s*mua(\s*hang|\s*hàng)?/,          // "cách mua hàng"
                /dat\s*(hang|mua)/,                               // "đặt hàng"
            ],
        };

        // Score each intent by keyword hits; add extra weight for patterns
        const score = { product: 0, price: 0, howto: 0, contact: 0 };
        Object.entries(keywords).forEach(([intent, list]) => {
            list.forEach(k => { if (t.includes(k)) score[intent] += 1; });
        });
        patterns.howto.forEach(p => { if (p.test(t)) score.howto += 2; });

        // Pick highest score; tie-break preference favors howto > price > contact > product
        const intents = ['howto', 'price', 'contact', 'product'];
        const maxScore = Math.max(...Object.values(score));
        if (maxScore === 0) return null;
        return intents.find(i => score[i] === maxScore) || null;
    };

    const apologyVi = 'Xin lỗi vì sự bất tiện này thông tin của bạn nằm ngoài hiểu biết của chúng tôi.';
    const apologyEn = 'Sorry for the inconvenience — your message is outside my current knowledge.';

    const detectLanguage = (text) => {
        const hasDiacritics = /[\u00C0-\u1EF9]/.test(text);
        const englishKeywords = ['what', 'how', 'price', 'buy', 'order', 'contact', 'support', 'product', 'details', 'compare', 'warranty', 'shipping', 'help'];
        const lower = text.toLowerCase();
        const looksAscii = /^[\x00-\x7F]+$/.test(text);
        const hasEnglishWord = englishKeywords.some(k => lower.includes(k));
        if (!hasDiacritics && (looksAscii || hasEnglishWord)) return 'en';
        return 'vi';
    };

    const onSend = () => {
        const text = input.trim();
        if (!text) return;
        const lang = detectLanguage(text);
        setChatLang(lang);
        const intent = detectIntent(text);
        if (intent) {
            const stepMap = { product: 2, price: 3, howto: 5, contact: 5 };
            const botMsg = getAnswersForLang(lang)[intent];
            setMessages(prev => ([
                ...prev,
                { id: Date.now() + '-u', from: 'user', text },
                { id: Date.now() + '-b', from: 'bot', ...(typeof botMsg === 'string' ? { text: botMsg } : botMsg) }
            ]));
            const nextStep = stepMap[intent];
            if (nextStep) setStep(nextStep);
        } else {
            setMessages(prev => ([
                ...prev,
                { id: Date.now() + '-u', from: 'user', text },
                { id: Date.now() + '-b', from: 'bot', text: lang === 'en' ? apologyEn : apologyVi }
            ]));
        }
        setInput('');
    };

    return (
        <div className="fixed bottom-4 right-4 z-[60]">
            {/* Toggle button */}
            {!open && (
                <button
                    aria-label={chatLang === 'en' ? 'Open chat' : 'Mở chat tư vấn'}
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-full shadow-lg transition px-4 py-3 text-[var(--color-light-beige)] bg-[var(--color-primary-red)] hover:opacity-90"
                >
                    <ChatIcon className="w-5 h-5" />
                    <span className="hidden sm:inline">{chatLang === 'en' ? 'Support chat' : 'Chat tư vấn'}</span>
                </button>
            )}

            {/* Chat panel */}
            {open && (
                <div className="w-[92vw] sm:w-80 md:w-96 h-[60vh] sm:h-[520px] bg-white rounded-xl shadow-2xl overflow-hidden border border-[var(--color-sand)]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-primary-red)] text-[var(--color-light-beige)]">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
                            <div className="text-sm font-semibold">{chatLang === 'en' ? 'Product support' : 'Tư vấn sản phẩm'}</div>
                        </div>
                        <button aria-label={chatLang === 'en' ? 'Close chat' : 'Đóng chat'} onClick={() => setOpen(false)} className="p-1 hover:opacity-90">
                            <CloseIcon className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col h-[calc(60vh-56px)] sm:h-[calc(520px-56px)]">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-3 py-3 bg-gray-50">
                            {messages.map(m => (
                                <div key={m.id} className={`mb-2 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`${m.from === 'user' ? 'bg-[var(--color-primary-red)] text-[var(--color-light-beige)]' : 'bg-white text-gray-800'} max-w-[80%] rounded-2xl px-3 py-2 shadow-sm border ${m.from === 'user' ? 'border-[var(--color-primary-red)]' : 'border-gray-200'}`}>
                                        {m.html ? (
                                            <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: m.html }} />
                                        ) : (
                                            <div className="text-sm leading-relaxed">{m.text}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {/* Quick replies based on current step */}
                            <div className={`mt-3 grid ${step === 5 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
                                {step !== 5 ? (
                                    getOptionsForStep(step)
                                        .filter(q => !hiddenOptions.includes(q.key))
                                        .map(q => (
                                            <button
                                                key={q.key}
                                                onClick={() => handleOption(q.key, q.label)}
                                                className="inline-flex items-center justify-start w-full text-xs px-3 py-1.5 rounded-full border border-[var(--color-primary-red)] text-[var(--color-primary-red)] bg-white hover:bg-[var(--color-sand)] transition"
                                            >
                                                {q.label}
                                            </button>
                                        ))
                                ) : (
                                    <>
                                        {/* Hotline - non clickable pill */}
                                        <div className="inline-flex items-center w-full text-xs px-3 py-1.5 rounded-full border border-[var(--color-primary-red)] text-[var(--color-primary-red)] bg-[var(--color-sand)] cursor-default select-none">
                                            {chatLang === 'en' ? 'Hotline:' : 'Liên hệ Hotline:'} {CHAT_CONFIG.phone}
                                        </div>
                                        {/* Zalo - clickable */}
                                        {!hiddenOptions.includes('zalo') && (
                                            <button
                                                onClick={() => handleOption('zalo', 'Zalo')}
                                                className="inline-flex items-center justify-start w-full gap-2 text-xs px-3 py-1.5 rounded-full border border-[var(--color-primary-red)] text-[var(--color-primary-red)] bg-white hover:bg-[var(--color-sand)] transition"
                                            >
                                                <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[var(--color-primary-red)] text-[var(--color-light-beige)] text-[10px]">Z</span>
                                                <span>Zalo</span>
                                            </button>
                                        )}
                                        {/* Facebook - clickable */}
                                        {!hiddenOptions.includes('facebook') && (
                                            <button
                                                onClick={() => handleOption('facebook', 'Fanpage')}
                                                className="inline-flex items-center justify-start w-full gap-2 text-xs px-3 py-1.5 rounded-full border border-[var(--color-primary-red)] text-[var(--color-primary-red)] bg-white hover:bg-[var(--color-sand)] transition"
                                            >
                                                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                                                    <path fill="currentColor" d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 4.94 3.62 9.05 8.36 9.88v-6.99H7.84v-2.9h2.4V9.83c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.12.18 2.12.18v2.32h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.64l-.42 2.9h-2.22v6.99c4.74-.83 8.36-4.94 8.36-9.88Z" />
                                                </svg>
                                                <span>Fanpage</span>
                                            </button>
                                        )}
                                        {/* Mail contact - label + Contact button */}
                                        <div className="flex items-center gap-2">
                                            <div className="inline-flex items-center flex-1 text-xs px-3 py-1.5 rounded-full border border-[var(--color-primary-red)] text-[var(--color-primary-red)] bg-[var(--color-sand)] cursor-default select-none">
                                                {chatLang === 'en' ? 'Contact via email' : 'Liên hệ qua mail'}
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const el = document.getElementById('contact');
                                                    el?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-primary-red)] text-[var(--color-light-beige)] hover:opacity-90"
                                            >
                                                {chatLang === 'en' ? 'Contact' : 'Liên hệ'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div ref={bottomRef} />
                        </div>

                        {/* Composer */}
                        <div className="px-3 py-2 bg-white border-t">
                            <div className="flex items-center gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
                                    placeholder={chatLang === 'en' ? 'Type your question…' : 'Nhập câu hỏi của bạn...'}
                                    className="flex-1 rounded-lg border border-[var(--color-sand)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-coral)]"
                                />
                                <button
                                    onClick={onSend}
                                    className="px-3 py-2 rounded-lg text-sm bg-[var(--color-primary-red)] text-[var(--color-light-beige)] hover:opacity-90"
                                >
                                    {chatLang === 'en' ? 'Send' : 'Gửi'}
                                </button>
                            </div>
                            <div className="mt-1 text-[11px] text-gray-500">
                                {chatLang === 'en' ? 'Messages may be auto-replied based on context.' : 'Tin nhắn có thể được phản hồi tự động theo ngữ cảnh.'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
