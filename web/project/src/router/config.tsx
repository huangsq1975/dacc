import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import HomeEN from "../pages/home-en/page";
import UseCaseEN from "../pages/use-case-en/page";
import UseCaseTTLEN from "../pages/use-case-ttl-en/page";
import UseCaseConfluxEN from "../pages/use-case-conflux-en/page";
import UseCaseVATPEN from "../pages/use-case-vatp-en/page";
import BlogEN from "../pages/blog-en/page";
import ContactEN from "../pages/contact-en/page";
import ColdWalletEN from "../pages/cold-wallet-en/page";
import HotWalletEN from "../pages/hot-wallet-en/page";
import RWAPlatformEN from "../pages/rwa-platform-en/page";
import ChainFusionEN from "../pages/chain-fusion-en/page";
import NewsChainFusionEN from "../pages/news-chainfusion-en/page";

const routes: RouteObject[] = [
  { path: "/", element: <HomeEN /> },
  { path: "/blog", element: <BlogEN /> },
  { path: "/contact", element: <ContactEN /> },
  { path: "/cold-wallet", element: <ColdWalletEN /> },
  { path: "/hot-wallet", element: <HotWalletEN /> },
  { path: "/rwa-platform", element: <RWAPlatformEN /> },
  { path: "/chain-fusion", element: <ChainFusionEN /> },
  { path: "/news-chainfusion", element: <NewsChainFusionEN /> },
  { path: "/use-case", element: <UseCaseEN /> },
  { path: "/use-case-ttl", element: <UseCaseTTLEN /> },
  { path: "/use-case-conflux", element: <UseCaseConfluxEN /> },
  { path: "/use-case-vatp", element: <UseCaseVATPEN /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
