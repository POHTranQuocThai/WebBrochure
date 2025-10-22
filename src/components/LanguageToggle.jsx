import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ReactCountryFlag from 'react-country-flag';

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    console.log("🚀 ~ LanguageToggle ~ i18n:", i18n)

    const change = (lng) => {
        if (!i18n) return;
        if (i18n.language?.startsWith(lng)) return; // ví dụ 'ja-JP' cũng match 'ja'
        i18n.changeLanguage(lng);
    };


    // cấu trúc item cho antd (dễ mở rộng nếu thêm ngôn ngữ)
    const items = [
        {
            key: 'vi',
            label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ReactCountryFlag countryCode="VN" svg style={{ width: 20, height: 14 }} aria-label="Vietnam flag" />
                    <span style={{ fontWeight: 600 }}>VI</span>
                </span>
            ),
        },
        {
            key: 'en',
            label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Dùng "GB" thay "US" nếu muốn cờ Anh; tuỳ chiến lược ngôn ngữ */}
                    <ReactCountryFlag countryCode="GB" svg style={{ width: 20, height: 14 }} aria-label="United Kingdom flag" />
                    <span style={{ fontWeight: 600 }}>EN</span>
                </span>
            ),
        },
        {
            key: 'ja',
            label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ReactCountryFlag countryCode="JP" svg style={{ width: 20, height: 14 }} aria-label="Japan flag" />
                    <span style={{ fontWeight: 600 }}>JA</span>
                </span>
            ),
        },
    ];

    const langMap = {
        vi: { code: 'VI', flag: 'VN', label: 'Vietnam' },
        en: { code: 'EN', flag: 'GB', label: 'English' },
        ja: { code: 'JA', flag: 'JP', label: '日本語' },
    };

    const currentLang = i18n.language?.split('-')[0] || 'en';
    const displayLang = langMap[currentLang] || langMap.en;

    return (
        <Dropdown
            menu={{
                items,
                onClick: ({ key }) => change(key),
            }}
            trigger={['click']}
            placement="bottomRight"
        >
            <Button
                type="text"
                aria-haspopup="true"
                aria-label="Language switcher"
                className="lang-toggle-btn"
                style={{ padding: '6px 10px', fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
            >
                <Space size="small" align="center">
                    <ReactCountryFlag
                        countryCode={displayLang.flag}
                        svg
                        style={{ width: 20, height: 14 }}
                        title={displayLang.label}
                        aria-hidden={false}
                        aria-label={`${displayLang.label} flag`}
                    />
                    <span className="lang-code">{displayLang.code}</span>
                    <span className="lang-caret"><DownOutlined /></span>
                </Space>
            </Button>
        </Dropdown>
    );
}
