import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <Image
          src="/images/hero.jpg"
          alt="Hero Image"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

export default Home;
