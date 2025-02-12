import React from "react";
import LayoutAppShell from "@/layout/appShell";

import { Route, Routes } from "react-router";
import { ROUTER } from "@/constants/router";
import { PageTag, PageTask, PageUser } from "./page";



const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<LayoutAppShell />}>
        <Route path="/" element={<PageTask />} />
        <Route path={ROUTER.TASK.href} element={<PageTask />} />
        <Route path={ROUTER.USER.href} element={<PageUser />} />
        <Route path={ROUTER.TAG.href} element={<PageTag />} />
      </Route>
    </Routes>
  )
}

export default AppRouter;