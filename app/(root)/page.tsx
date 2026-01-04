import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/sign-in">
        <Button>Tıkla</Button>
      </Link>
    </div>
  );
};

export default Home;
