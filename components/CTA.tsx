import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning on your own pace</div>
      <h2 className="text-3xl font-bold">
        Build & Personalise as per YOUR choice
      </h2>
      <p>
        Pick name, subject, topic, voice of your choice & start learning NOW!
      </p>
      <Image src="/images/cta.svg" alt="cta" width={362} height={250}/>
      <button className="btn-primary">
        <Image src="/icons/plus.svg" alt="add" width={12} height={12}/>
        <Link href="/companions/new">
        Build a new companion
        </Link>
      </button>
    </section>
  );
}
