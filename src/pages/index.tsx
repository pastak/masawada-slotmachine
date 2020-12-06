import React from "react";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div>
      <Link href="/slots/">slots</Link>
    </div>
  );
};

export default HomePage;
