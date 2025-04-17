import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <SignIn signUpUrl="/sign-up"/>
    </div>
  );
};

export default Page;
