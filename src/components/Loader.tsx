const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-sm aspect-[9/14] bg-gradient-to-br rounded-lg flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-t-4 border-b-4 border-transparent border-indigo-500 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-l-4 border-r-4 border-transparent border-pink-500 animate-spin-reverse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;