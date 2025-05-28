import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/cooking-loader.json";

export default function GlobalLoader({ mini = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        mini ? "min-h-[60vh]" : "fixed inset-0 z-50 bg-white"
      }`}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "200px", width: "200px" }}
      />
      <p className="mt-4 text-lg font-medium text-orange-500">
        Preparing your recipe...
      </p>
    </div>
  );
}


