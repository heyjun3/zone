import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/home2.tsx"),
    layout('./layouts/layout.tsx', [
        route("team/:teamId", "routes/team.tsx"),
    ])
] satisfies RouteConfig;
