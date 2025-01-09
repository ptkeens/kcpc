import type { Route } from "./+types/home";
import { HomeComponent } from "~/components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kit Car Part Catalog" },
    { name: "description", content: "The kit car part catalog helps you organize and verify the parts you have for your favorite kit car!" },
  ];
}

export default function Home() {
  return <HomeComponent/>
}
