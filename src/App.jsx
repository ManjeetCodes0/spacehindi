import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AdSlot from './components/common/AdSlot';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Facts = lazy(() => import('./pages/Facts'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Tools = lazy(() => import('./pages/Tools'));

// Lazy load tools
const ISSTracker = lazy(() => import('./components/tools/ISSTracker'));
const SpaceAgeCalculator = lazy(() => import('./components/tools/SpaceAgeCalculator'));
const UniverseScale = lazy(() => import('./components/tools/UniverseScale'));
const WeightCalculator = lazy(() => import('./components/tools/WeightCalculator'));
const FactGenerator = lazy(() => import('./components/FactGenerator'));

// Lazy load quiz components
const SpaceQuiz = lazy(() => import('./components/quiz/SpaceQuiz'));

// Loading Component
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-matter via-space-gray to-dark-matter"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="cosmic-spinner mx-auto mb-4"
      />
      <motion.h2
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-2xl font-bold gradient-text"
      >
        Loading Space Content...
      </motion.h2>
      <motion.div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-purple-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  </motion.div>
);

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  
  return null;
};

// Page Transition Wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// 404 Page
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-8xl mb-4"
      >
        🛸
      </motion.div>
      <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
      <p className="text-2xl text-gray-400 mb-8">Lost in Space!</p>
      <a href="/" className="btn-cosmic inline-block">
        Return to Earth
      </a>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    // Performance optimization
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('pause-animations');
      } else {
        document.body.classList.remove('pause-animations');
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Progressive Web App registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('Service Worker registration failed');
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('light-mode');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-matter via-space-gray to-dark-matter opacity-90" />
          
          {/* Parallax stars */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, white 0%, transparent 1%), 
                               radial-gradient(circle at 80% 20%, white 0%, transparent 1%),
                               radial-gradient(circle at 20% 80%, white 0%, transparent 1%)`,
              backgroundSize: '150px 150px, 200px 200px, 180px 180px',
              backgroundPosition: '0% 0%, 20% 60%, 80% 40%',
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
            animate={{
              backgroundPosition: ['0% 0%, 20% 60%, 80% 40%', '100% 100%, 80% 20%, 20% 80%']
            }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Meteor shower effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="meteor"
              style={{
                top: `${Math.random() * 50}%`,
                left: '110%',
                animationDelay: `${i * 3}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <ScrollToTop />
          
          {/* Navigation */}
          <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
          
          {/* Routes */}
          <main className="min-h-screen pt-20">
            <AnimatePresence mode="wait">
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  } />
                  
                  <Route path="/about" element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  } />
                  
                  <Route path="/facts" element={
                    <PageTransition>
                      <Facts />
                    </PageTransition>
                  } />
                  
                  <Route path="/gallery" element={
                    <PageTransition>
                      <Gallery />
                    </PageTransition>
                  } />
                  
                  <Route path="/quiz" element={
                    <PageTransition>
                      <Quiz />
                    </PageTransition>
                  } />
                  
                  <Route path="/tools" element={
                    <PageTransition>
                      <Tools />
                    </PageTransition>
                  } />
                  
                  {/* Individual Tools Routes */}
                  <Route path="/tools/iss-tracker" element={
                    <PageTransition>
                      <ISSTracker />
                    </PageTransition>
                  } />
                  
                  <Route path="/tools/space-age-calculator" element={
                    <PageTransition>
                      <SpaceAgeCalculator />
                    </PageTransition>
                  } />
                  
                  <Route path="/tools/universe-scale" element={
                    <PageTransition>
                      <UniverseScale />
                    </PageTransition>
                  } />
                  
                  <Route path="/tools/weight-calculator" element={
                    <PageTransition>
                      <WeightCalculator />
                    </PageTransition>
                  } />
                  
                  <Route path="/tools/fact-generator" element={
                    <PageTransition>
                      <FactGenerator />
                    </PageTransition>
                  } />
                  
                  {/* Quiz Routes */}
                  <Route path="/quiz/space-quiz" element={
                    <PageTransition>
                      <SpaceQuiz />
                    </PageTransition>
                  } />
                  
                  {/* 404 Page */}
                  <Route path="*" element={
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  } />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </main>
          
          {/* Ad Slots - Can be configured */}
          <AdSlot position="sidebar" />
          
          {/* Footer */}
          <Footer />
        </div>

        {/* Global Components */}
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
              color: '#fff',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            },
            success: {
              iconTheme: {
                primary: '#4ECDC4',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF6B6B',
                secondary: '#fff',
              },
            },
          }}
        />

        {/* Floating Action Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg flex items-center justify-center text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </motion.div>

        {/* Cookie Consent (Optional) */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 p-4"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="container-custom">
            <div className="glass-card p-4 flex items-center justify-between">
              <p className="text-sm text-gray-300">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
              <button
                className="ml-4 px-4 py-2 bg-purple-500 rounded-lg text-white text-sm hover:bg-purple-600 transition-colors"
                onClick={(e) => e.currentTarget.parentElement.parentElement.remove()}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>

        {/* Performance Monitor (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-20 left-4 z-50 glass-card p-2 text-xs text-gray-400">
            <div>FPS: 60</div>
            <div>Mouse: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}</div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
