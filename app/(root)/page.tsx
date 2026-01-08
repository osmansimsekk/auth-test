import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Image
        src="/images/hero.jpg"
        alt="Hero Image"
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Home;
