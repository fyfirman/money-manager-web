import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  void router.push("/sign-in");

  return undefined;
}
