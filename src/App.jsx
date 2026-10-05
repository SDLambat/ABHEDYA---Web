import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import OverviewPage from './pages/OverviewPage';

const OpticsPage = lazy(() => import('./pages/OpticsPage'));
const WorkflowPage = lazy(() => import('./pages/WorkflowPage'));
const FeasibilityPage = lazy(() => import('./pages/FeasibilityPage'));
const HardwarePage = lazy(() => import('./pages/HardwarePage'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));

const VALID_PAGES = ['overview', 'optics', 'workflow', 'feasibility', 'hardware', 'impact', 'docs', 'team'];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_PAGES.includes(hash) ? hash : 'overview';
  });

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash)) setActivePage(hash);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleNavigate = useCallback((pageId) => {
    if (VALID_PAGES.includes(pageId)) {
      setActivePage(pageId);
      window.location.hash = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'optics': return <OpticsPage onNavigate={handleNavigate} />;
      case 'workflow': return <WorkflowPage onNavigate={handleNavigate} />;
      case 'feasibility': return <FeasibilityPage onNavigate={handleNavigate} />;
      case 'hardware': return <HardwarePage onNavigate={handleNavigate} />;
      case 'impact': return <ImpactPage onNavigate={handleNavigate} />;
      case 'docs': return <DocsPage onNavigate={handleNavigate} />;
      case 'team': return <TeamPage onNavigate={handleNavigate} />;
      default: return <OverviewPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onDone={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between font-serif">
        <Navbar activePage={activePage} onNavigate={handleNavigate} />

        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-2 sm:pt-4 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              <Suspense
                fallback={
                  <div className="min-h-[40vh] flex items-center justify-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                      <span>Loading section...</span>
                    </div>
                  </div>
                }
              >
                {renderPage()}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        <FooterSection onNavigate={handleNavigate} activePage={activePage} />
      </div>
    </>
  );
}
