import { site } from "@/data";
import Legal from "../components/layout/legal/Legal";

export default function TermsPage() {
  return (
    <>
      <Legal data={site.termsPage} />
    </>
  );
}