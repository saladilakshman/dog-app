export const Loader = () => {
  let layoutblocks = [];
  let layoutamount = 0;
  do {
    layoutamount++;
    layoutblocks.push(layoutamount);
  } while (layoutamount < 20);
  return (
    <div className="layout">
      {Array.from(layoutblocks, (layoutblock, index) => {
        return (
          <div
            key={index}
            className="bg-gray-200 animate-pulse w-full h-full aspect-square rounded-lg"
          >
            {""}
          </div>
        );
      })}
    </div>
  );
};
