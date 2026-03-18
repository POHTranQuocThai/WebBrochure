import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./Section";
import heroProduct from "../assets/img/productImg/prod4hero.png"
import { getVoucherByPhone } from "../api/voucher";

const normalizePhone = (value) => value.replace(/\D/g, "");

const Hero = () => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState("");
    const [result, setResult] = useState(null);
    const [isCopying, setIsCopying] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checking) return;
        const normalized = normalizePhone(phone.trim());

        if (!normalized) {
            // Nếu chưa có kết quả thành công trước đó thì mới báo lỗi,
            // còn nếu đã có mã voucher rồi thì giữ nguyên, không ghi đè.
            if (!result || result.status !== "success") {
                setResult({
                    status: "error",
                    message: t("voucherHero.errors.invalidPhone"),
                });
            }
            return;
        }

        setChecking(true);
        try {
            const voucher = await getVoucherByPhone(normalized);

            if (voucher) {
                setResult({
                    status: "success",
                    code: voucher,
                    message: t("voucherHero.successMessage"),
                });
                return;
            }

            setResult({
                status: "error",
                message: t("voucherHero.errors.notApplied"),
            });
        } catch (error) {
            setResult({
                status: "error",
                message: t("voucherHero.errors.serverError"),
            });
        } finally {
            setChecking(false);
        }
    };

    const handleCopy = async () => {
        if (!result || result.status !== "success") return;
        try {
            await navigator.clipboard.writeText(result.code);
            setIsCopying(true);
            setTimeout(() => setIsCopying(false), 1500);
        } catch (error) {
            // Có thể bổ sung thông báo lỗi sao chép nếu cần
        }
    };

    return (
        <Section id="home" className="section hero-section">
            <div className="hero-inner">
                <div className="hero-left">
                    <div className="hero-image-wrapper">
                        <img
                            src={heroProduct}
                            alt="Sản phẩm đặc trưng"
                            className="hero-product-image"
                        />
                    </div>
                </div>

                <div className="hero-right">
                    <h1 className="hero-heading">
                        {t("voucherHero.headingPrefix")}
                        <span className="hero-voucher-highlight">
                            <span className="hero-voucher-label">VOUCHER</span>
                            <span className="hero-voucher-amount">50K</span>
                        </span>
                        {t("voucherHero.headingSuffix")}
                    </h1>

                    <div className="voucher-steps">
                        <h2 className="voucher-steps-title">{t("voucherHero.stepsTitle")}</h2>
                        <ul className="voucher-steps-list">
                            <li className="voucher-step">
                                <span className="voucher-step-number">01</span>
                                <div className="voucher-step-text">{t("voucherHero.steps.one")}</div>
                            </li>
                            <li className="voucher-step">
                                <span className="voucher-step-number">02</span>
                                <div className="voucher-step-text">{t("voucherHero.steps.two")}</div>
                            </li>
                            <li className="voucher-step">
                                <span className="voucher-step-number">03</span>
                                <div className="voucher-step-text">
                                    {t("voucherHero.steps.threeMain")}
                                    <br />
                                    <span className="voucher-step-note">{t("voucherHero.steps.threeNote")}</span>
                                </div>
                            </li>
                        </ul>
                        <p className="voucher-note">{t("voucherHero.note")}</p>
                    </div>

                    <form className="voucher-form" onSubmit={handleSubmit}>
                        <div className="voucher-input-group">
                            <input
                                type="tel"
                                inputMode="tel"
                                className="voucher-input"
                                placeholder={t("voucherHero.inputPlaceholder")}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary voucher-check-button"
                                disabled={checking}
                                aria-busy={checking}
                            >
                                {checking
                                    ? t("voucherHero.checkingButton", "Đang kiểm tra...")
                                    : t("voucherHero.checkButton")}
                            </button>
                        </div>

                        {result && (
                            <div className={`voucher-result voucher-result-${result.status}`}>
                                {result.status === "success" ? (
                                    <>
                                        <p className="voucher-result-label">{t("voucherHero.resultLabel")}</p>
                                        <div className="voucher-code-row">
                                            <div className="voucher-code">
                                                <span className="voucher-code-text">{result.code}</span>
                                                <button
                                                    type="button"
                                                    className="voucher-copy-icon"
                                                    onClick={handleCopy}
                                                    aria-label={t("voucherHero.copyAria")}
                                                >
                                                    {isCopying ? "✓" : "📋"}
                                                </button>
                                            </div>
                                        </div>
                                        <p className="voucher-congrats">{result.message}</p>
                                    </>
                                ) : (
                                    <p className="voucher-error-message">{result.message}</p>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
