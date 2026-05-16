import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

// Eager-load Home for fastest LCP on the most common landing page.
import Home from './pages/Home';

// Defer the rest: each route becomes its own JS chunk and is fetched
// only when the user navigates. Cuts the homepage payload meaningfully
// and improves TTI on slower networks.
const Practice = lazy(() => import('./pages/Practice'));
const About = lazy(() => import('./pages/About'));
const Results = lazy(() => import('./pages/Results'));
const Areas = lazy(() => import('./pages/Areas'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Lightweight fallback that preserves layout height to avoid CLS. */
function RouteFallback() {
  return (
    <div
      aria-hidden="true"
      style={{ minHeight: '60vh' }}
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/practice"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Practice />
            </Suspense>
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<RouteFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/results"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Results />
            </Suspense>
          }
        />
        <Route
          path="/areas"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Areas />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
