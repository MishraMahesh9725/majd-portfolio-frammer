import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BlogPage } from "./pages/Blog";
import { HomePage } from "./pages/Home";
import { PostPage } from "./pages/Post";
import { ProjectPage } from "./pages/Project";
import { WorkPage } from "./pages/Work";

function Titles() {
  const { pathname } = useLocation();
  useEffect(() => {
    const names: Record<string, string> = {
      "/": "Majd",
      "/work": "Work — Majd",
      "/blog": "Blog — Majd",
    };
    document.title = names[pathname] || "Majd";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <Titles />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="work/:slug" element={<ProjectPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<PostPage />} />
        </Route>
      </Routes>
    </>
  );
}
