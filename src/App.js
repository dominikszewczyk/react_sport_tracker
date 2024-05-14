import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import Stopwatch from "./components/Stopwatch/Stopwatch";
import Workout from './components/Workout/Workout';
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

import './App.css';

function App() {
    const { t } = useTranslation();

    return (
        <div>
            <Workout />
            {/* <LanguageSwitcher /> */}
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
