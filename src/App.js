// import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import Workout from './components/Workouts/Workouts';
// import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";

import './App.css';

function App() {
    // const { t } = useTranslation();

    return (
        <div>
            <Workout />
            {/* <LanguageSwitcher /> */}
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
