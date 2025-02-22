import type { Route } from "./+types/team";


export async function clientLoader({ params }: Route.LoaderArgs) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const team = params.teamId
    return { name: team }
}

export function HydrateFallback() {
    return <p>Loading Game...</p>;
  }

export default function Component({
    loaderData,
  }: Route.ComponentProps) {
    return <h1>{loaderData.name}</h1>;
  }
