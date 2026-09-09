import { site } from "@/data";
import Legal from "../components/layout/legal/Legal";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Legal data={site.privacyPolicyPage} />
    </>
  );
}