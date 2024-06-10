export const BreedInfoImageSpinner = () => {
  return (
    <div className="w-[100%]  aspect-square bg-gray-200 animate-pulse "></div>
  );
};
export const BreedInfoTextSpinner = () => {
  return (
    <div className="flex flex-col justify-start items-baseline gap-10">
      <div className="w-[40rem] h-4 rounded-sm bg-gray-200 animate-pulse max-lg:w-[20rem] max-sm:w-[15rem]"></div>
      <div className="w-[40rem] h-4 rounded-sm bg-gray-200 animate-pulse max-lg:w-[20rem] max-sm:w-[15rem]"></div>
      <div className="w-[40rem] h-4 rounded-sm bg-gray-200 animate-pulse max-lg:w-[20rem] max-sm:w-[15rem]"></div>
      <div className="w-[40rem] h-4 rounded-sm bg-gray-200 animate-pulse max-lg:w-[20rem] max-sm:w-[15rem]"></div>
      <div className="px-12 py-5 rounded-lg bg-gray-200 animate-pulse"></div>
    </div>
  );
};
