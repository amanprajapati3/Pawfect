import { site } from "@/data";
import Legal from "../components/layout/legal/Legal";

export default function DisclaimerPage() {
  return (
    <>
      <Legal data={site.disclaimerPage} />
    </>
  );
}