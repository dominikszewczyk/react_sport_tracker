import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import Stopwatch from "./components/Stopwatch/Stopwatch";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

import './App.css';

function App() {
    const { t } = useTranslation();

    return (
        <div className="workout">
            <h1>{t('workout.h1')}.</h1>
            <LanguageSwitcher />
            <Stopwatch />
        </div>
    );
}

export default function WrappedApp() {
    return (
        <Suspense fallback="...loading">
            <App />
        </Suspense>
    )
}
