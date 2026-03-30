import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import HomeEN from "../pages/home-en/page";
import UseCase from "../pages/use-case/page";
import UseCaseEN from "../pages/use-case-en/page";
import UseCaseTTL from "../pages/use-case-ttl/page";
import UseCaseTTLEN from "../pages/use-case-ttl-en/page";
import UseCaseConflux from "../pages/use-case-conflux/page";
import UseCaseConfluxEN from "../pages/use-case-conflux-en/page";
import UseCaseVATP from "../pages/use-case-vatp/page";
import UseCaseVATPEN from "../pages/use-case-vatp-en/page";
import Blog from "../pages/blog/page";
import BlogEN from "../pages/blog-en/page";
import Contact from "../pages/contact/page";
import ContactEN from "../pages/contact-en/page";
import ColdWallet from "../pages/cold-wallet/page";
import ColdWalletEN from "../pages/cold-wallet-en/page";
import HotWallet from "../pages/hot-wallet/page";
import HotWalletEN from "../pages/hot-wallet-en/page";
import RWAPlatform from "../pages/rwa-platform/page";
import RWAPlatformEN from "../pages/rwa-platform-en/page";
import ChainFusion from "../pages/chain-fusion/page";
import ChainFusionEN from "../pages/chain-fusion-en/page";
import NewsChainFusionEN from "../pages/news-chainfusion-en/page";
import NewsChainFusion from "../pages/news-chainfusion/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeEN />,
  },
  {
    path: "/zh",
    element: <Home />,
  },
  {
    path: "/en",
    element: <HomeEN />,
  },
  {
    path: "/home-en",
    element: <HomeEN />,
  },
  {
    path: "/use-case",
    element: <UseCase />,
  },
  {
    path: "/use-case-en",
    element: <UseCaseEN />,
  },
  {
    path: "/use-case-ttl",
    element: <UseCaseTTL />,
  },
  {
    path: "/use-case-ttl-en",
    element: <UseCaseTTLEN />,
  },
  {
    path: "/use-case-conflux",
    element: <UseCaseConflux />,
  },
  {
    path: "/use-case-conflux-en",
    element: <UseCaseConfluxEN />,
  },
  {
    path: "/use-case-vatp",
    element: <UseCaseVATP />,
  },
  {
    path: "/use-case-vatp-en",
    element: <UseCaseVATPEN />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog-en",
    element: <BlogEN />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/contact-en",
    element: <ContactEN />,
  },
  {
    path: "/cold-wallet",
    element: <ColdWallet />,
  },
  {
    path: "/cold-wallet-en",
    element: <ColdWalletEN />,
  },
  {
    path: "/hot-wallet",
    element: <HotWallet />,
  },
  {
    path: "/hot-wallet-en",
    element: <HotWalletEN />,
  },
  {
    path: "/rwa-platform",
    element: <RWAPlatform />,
  },
  {
    path: "/rwa-platform-en",
    element: <RWAPlatformEN />,
  },
  {
    path: "/chain-fusion",
    element: <ChainFusion />,
  },
  {
    path: "/chain-fusion-en",
    element: <ChainFusionEN />,
  },
  {
    path: "/news-chainfusion-en",
    element: <NewsChainFusionEN />,
  },
  {
    path: "/news-chainfusion",
    element: <NewsChainFusion />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;