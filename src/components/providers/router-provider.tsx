import { routeTree } from "@/generated/routes.gen"
import {
  ErrorComponent,
  RouterProvider as TanStackRouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router"
import PageLoader from "../layouts/page-loader"
import { queryClient } from "./query-provider"

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
})

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <PageLoader />,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultNotFoundComponent: () => <div>Not Found</div>,
  history: memoryHistory,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
})

export function RouterProvider() {
  return <TanStackRouterProvider router={router} />
}
