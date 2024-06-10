import { breeds, breedimagebaseurl } from "../breeds";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState, useEffect, useMemo } from "react";
import oops from "../assets/oops.png";
import axios from "axios";
import { Loader } from "../utils/loader";
import { useNavigate } from "react-router-dom";
export const Breeds = () => {
  const navigate = useNavigate();
  const [breedsdata, setbreedsdata] = useState([]);
  const [val, setVal] = useState("");
  const [isnodogsfound, setIsnodogsfound] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const fetchbreedlist = useMemo(
    () => async () => {
      try {
        const response = axios.get("https://api.thedogapi.com/v1/breeds");
        setbreedsdata(response?.data);
      } catch (err) {
        setbreedsdata(breeds);
        console.log(err.message);
      } finally {
        setIsloading(false);
      }
    },
    []
  );
  useEffect(() => {
    fetchbreedlist();
  }, [fetchbreedlist]);

  useEffect(() => {
    const specificdogbreed = breeds.filter((dog) => dog.name.includes(val));
    if (specificdogbreed.length === 0) {
      setbreedsdata([]);
      setIsnodogsfound(true);
    } else {
      setbreedsdata(specificdogbreed);
      setIsnodogsfound(false);
    }
  }, [val]);
  return (
    <div className="mb-5">
      <section className="my-8 ">
        <h1 className="text-center font-poppins text-5xl pb-2 font-semibold text-transparent bg-gradient-to-tr from-slate-400 to-slate-600 bg-clip-text">
          PawPal
        </h1>
        <h1 className="text-center font-poppins text-xl text-transparent bg-gradient-to-tr from-pink-400 to-pink-600 bg-clip-text">
          {`Connect, care, and track your furry friend's journey with PawPal.`}
        </h1>
        <div className="py-5">
          <input
            type="search"
            className="w-1/3 bg-gray-200 rounded-full h-12  mx-auto block ps-4 pe-4 placeholder:font-poppins text-lg placeholder:text-black focus:outline-none max-lg:w-2/3 max-md:w-3/4 "
            placeholder="Search breed..."
            value={val}
            onChange={(e) => setVal(e.target.value)}
            inputMode="search"
          />
        </div>
      </section>
      {isnodogsfound && (
        <div className="flex  flex-col justif-center items-center pt-20">
          <LazyLoadImage src={oops} alt="" className="w-1/12  max-md:w-1/3" />
          <h1 className="text-xl font-poppins text-center">
            Oops! No dogs found
          </h1>
        </div>
      )}
      {isloading ? (
        <Loader />
      ) : (
        <div className="layout">
          {breedsdata.map(({ id, name, reference_image_id }) => {
            return (
              <div
                key={id}
                className="relative"
                onClick={() =>
                  document.startViewTransition(() => {
                    navigate(`/${name}`);
                  })
                }
              >
                <LazyLoadImage
                  src={`${breedimagebaseurl}${reference_image_id}.jpg`}
                  alt=""
                  onError={(e) =>
                    (e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png")
                  }
                  className="w-full h-full rounded-lg aspect-square"
                />
                <div className="flex pl-2 w-full absolute left-0 right-0 bottom-0  bg-slate-100/40">
                  <h3 className="font-poppins text-lg font-semibold text-gray-800 opacity-100 py-2 truncate max-md:text-base">
                    {name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
