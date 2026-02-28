import { createContext, useState, useContext } from 'react';
import { te } from '../translations/te';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');

    // Translation function
    const t = (key) => {
        if (lang === 'en') return key; // Default return the English key
        return te[key] || key; // Return Telugu translation or fallback to English key
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
