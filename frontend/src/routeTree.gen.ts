/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as CreateBusinessRouteImport } from './routes/create-business'
import { Route as LoginRouteImport } from './routes/login'
import { Route as RegisterRouteImport } from './routes/register'

const IndexRoute = IndexRouteImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => rootRouteImport,
} as any)
const CreateBusinessRoute = CreateBusinessRouteImport.update({
    id: '/create-business',
    path: '/create-business',
    getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
    id: '/login',
    path: '/login',
    getParentRoute: () => rootRouteImport,
} as any)
const RegisterRoute = RegisterRouteImport.update({
    id: '/register',
    path: '/register',
    getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
    '/': typeof IndexRoute
    '/create-business': typeof CreateBusinessRoute
    '/login': typeof LoginRoute
    '/register': typeof RegisterRoute
}
export interface FileRoutesByTo {
    '/': typeof IndexRoute
    '/create-business': typeof CreateBusinessRoute
    '/login': typeof LoginRoute
    '/register': typeof RegisterRoute
}
export interface FileRoutesById {
    __root__: typeof rootRouteImport
    '/': typeof IndexRoute
    '/create-business': typeof CreateBusinessRoute
    '/login': typeof LoginRoute
    '/register': typeof RegisterRoute
}
export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath
    fullPaths: '/' | '/create-business' | '/login' | '/register'
    fileRoutesByTo: FileRoutesByTo
    to: '/' | '/create-business' | '/login' | '/register'
    id: '__root__' | '/' | '/create-business' | '/login' | '/register'
    fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
    IndexRoute: typeof IndexRoute
    CreateBusinessRoute: typeof CreateBusinessRoute
    LoginRoute: typeof LoginRoute
    RegisterRoute: typeof RegisterRoute
}

declare module '@tanstack/react-router' {
    interface FileRoutesByPath {
        '/': {
            id: '/'
            path: '/'
            fullPath: '/'
            preLoaderRoute: typeof IndexRouteImport
            parentRoute: typeof rootRouteImport
        }
        '/create-business': {
            id: '/create-business'
            path: '/create-business'
            fullPath: '/create-business'
            preLoaderRoute: typeof CreateBusinessRouteImport
            parentRoute: typeof rootRouteImport
        }
        '/login': {
            id: '/login'
            path: '/login'
            fullPath: '/login'
            preLoaderRoute: typeof LoginRouteImport
            parentRoute: typeof rootRouteImport
        }
        '/register': {
            id: '/register'
            path: '/register'
            fullPath: '/register'
            preLoaderRoute: typeof RegisterRouteImport
            parentRoute: typeof rootRouteImport
        }
    }
}

const rootRouteChildren: RootRouteChildren = {
    IndexRoute: IndexRoute,
    CreateBusinessRoute: CreateBusinessRoute,
    LoginRoute: LoginRoute,
    RegisterRoute: RegisterRoute,
}
export const routeTree = rootRouteImport
    ._addFileChildren(rootRouteChildren)
    ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
    interface Register {
        ssr: true
        router: Awaited<ReturnType<typeof getRouter>>
        config: Awaited<ReturnType<typeof startInstance.getOptions>>
    }
}
