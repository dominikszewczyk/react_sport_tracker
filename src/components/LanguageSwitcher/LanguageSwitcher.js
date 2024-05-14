import React from 'react'
import { useTranslation } from 'react-i18next';

const languages = {
    de: { title: 'Deutsch' },
    en: { title: 'English' },
    pl: { title: 'Polski' },
};

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    return (
        <>
            {
                Object.keys(languages).map((lng) => (
                    <button style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                        { languages[lng].title}
                    </button>
                ))
            }
        </>
    )
}
