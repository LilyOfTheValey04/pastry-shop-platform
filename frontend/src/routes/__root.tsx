
/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Outlet } from '@tanstack/react-router'

//Root route: <Outlet /> is the place where the current page is displayed
export const Route = createRootRoute({
    component: RootLayout,

    notFoundComponent: () => <p className="p-8 text-center">404 — The page was not found</p>,
})

function RootLayout() {
    return <Outlet />
}
