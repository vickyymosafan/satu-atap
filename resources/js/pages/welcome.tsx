import { Head } from '@inertiajs/react';
import LandingPage from '@/components/Landing/LandingPage';

export default function Welcome() {
    return (
        <>
            <Head title="Satu Atap">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <LandingPage />
        </>
    );
}
