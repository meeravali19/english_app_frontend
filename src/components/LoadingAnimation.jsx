import { Player } from "@lottiefiles/react-lottie-player";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex items-end space-x-4">
        {/* Student Animation */}
        <Player autoplay loop src="/animations/student.json"
          style={{ height: "150px", width: "150px" }} />
        {/* Giant/Vocab Animation */}
        <Player autoplay loop src="/animations/vocab-giant.json"
          style={{ height: "200px", width: "200px" }} />
      </div>
      <p className="mt-6 text-2xl font-bold text-indigo-700 animate-pulse">
        Be Brave, Learn and Defeat
      </p>
    </div>
  );
}

export default Loader;
