import { site } from "@/data";
import Legal from "../components/layout/legal/Legal";

export default function CookiePolicyPage() {
  return (
    <>
      <Legal data={site.cookiePolicyPage} />
    </>
  );
}