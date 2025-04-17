import { SignUp } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default page;
