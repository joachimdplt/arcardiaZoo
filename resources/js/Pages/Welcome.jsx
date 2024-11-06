import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Bienvenue sur Arcadia" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img src="/storage/animal_images/ARCADIA.jpg" alt="Arcadia Logo" className="h-48 w-auto lg:h-64" />                               
                                 </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Tableau de bord
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Connexion
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div
                                    id="docs-card"
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-100 transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        Bienvenue sur Arcadia
                                    </h2>
                                    <p className="mt-4 text-sm/relaxed">
                                    Arcadia est une application conçue pour faciliter la gestion des équipes, des services, des habitats, des animaux, de leur alimentation, ainsi que des rapports vétérinaires. Elle intègre également un système de messagerie et de commentaires, offrant une solution intuitive et adaptée aux besoins d’un parc zoologique moderne.
                                    </p>
                                </div>

                                <a
                                    href={route('admin.documentation')}
                                    className="flex items-start gap-4 rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-100 transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        Documentation
                                    </h2>
                                    <p className="mt-4 text-sm/relaxed">
                                        Consultez notre documentation pour en savoir plus sur la configuration et l'utilisation d'Arcadia.
                                    </p>
                                </a>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Arcadia - Version Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}