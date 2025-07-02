import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermission } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in"); //navigate to the sign in page
  const canCreateCompanion = await newCompanionPermission();
  return (
    <main className="min-lg:w-1/3 min-md:2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full flex flex-col gap-4">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image src="/images/limit.svg" alt="limit" width={360} height={230} />
          <div className="cta-badge">Upgrade your Plan!</div>
          <h1>You`&apos;`ve reached your limit</h1>
          <p>
            You have reached the limit for your current plan. Upgrade to premium
            for for features & companions.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
