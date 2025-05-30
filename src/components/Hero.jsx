import hero from "../assets/hero.png";
const Hero = () => {
  return (
    <>
      <div
        className="hero mt-20 overflow-hidden rounded-lg"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content py-30 text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Recipe Book</h1>
            <p className="mb-5">Discover and share amazing recipes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
