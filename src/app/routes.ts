import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import About from './pages/About';
import Journal from './pages/Journal';
import JournalArticle from './pages/JournalArticle';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Studio from './pages/Studio';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/studio',
    Component: Studio,
  },
  {
    path: '/work',
    Component: Work,
  },
  {
    path: '/work/:slug',
    Component: CaseStudy,
  },
  {
    path: '/services',
    Component: Services,
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/journal',
    Component: Journal,
  },
  {
    path: '/journal/:slug',
    Component: JournalArticle,
  },
  {
    path: '/contact',
    Component: Contact,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
