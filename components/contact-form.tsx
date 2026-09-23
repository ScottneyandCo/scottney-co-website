import { ArrowUpRight } from "lucide-react";

const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeRWZyR26B-9X4uUTptzdo-h2m0odOsm-gIfm31zZhG5rHIvg/viewform";

export default function ContactForm() {
  return (
    <a className="button" href={googleFormUrl}>
      Continue to project inquiry <ArrowUpRight />
    </a>
  );
}
