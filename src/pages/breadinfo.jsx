import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { breedimagebaseurl } from "../breeds";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  BreedInfoImageSpinner,
  BreedInfoTextSpinner,
} from "../utils/breedinfospinner";
export const BreedInfo = () => {
  const { breedinfo } = useParams();
  const navigate = useNavigate();
  const [breedinformation, setBreedinformation] = useState([]);
  const [isfetching, setIsfetching] = useState(true);
  useEffect(() => {
    axios
      .get(`https://api.thedogapi.com/v1/breeds/search?q=${breedinfo}`)
      .then((res) => setBreedinformation(res?.data[0]))
      .catch((err) => console.log(err.message))
      .finally(() => setIsfetching(false));
  }, [breedinfo]);
  const localcountry = (code) => {
    return new Intl.DisplayNames("en", { type: "region" }).of(code);
  };
  const localdescriptionformat = (desc) => {
    return (
      new Intl.ListFormat("en", {
        type: "conjunction",
        style: "long",
      }).format(desc?.split(",")) || null
    );
  };
  return (
    <div className=" px-20 max-lg:px-8 max-md:px-6">
      <div className="grid grid-cols-2  max-md:grid-cols-1 py-20 max-lg:gap-5">
        <div className="w-3/4 max-lg:w-auto max-md:w-80 max-sm:w-full">
          {isfetching ? (
            <BreedInfoImageSpinner />
          ) : (
            <LazyLoadImage
              src={`${breedimagebaseurl}${breedinformation?.reference_image_id}.jpg`}
              alt=""
              className="w-full h-full aspect-square"
              onError={(e) =>
                (e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png")
              }
            />
          )}
        </div>
        <div className="flex flex-col justify-center items-baseline gap-8 text-pretty ">
          {isfetching ? (
            <BreedInfoTextSpinner />
          ) : (
            <>
              <h1 className="font-poppins text-3xl font-normal max-md:text-xl text-wrap">
                {breedinformation?.name},
                <span className="text-md pl-2 text-gray-500">
                  {"country_code" in breedinformation
                    ? localcountry(breedinformation?.country_code)
                    : "Country not available"}
                </span>
              </h1>
              <h2 className="text-xl font-poppins">
                <span className="font-semibold">Bred for : </span>
                {breedinformation?.bred_for}
              </h2>
              <h2 className="text-xl font-poppins">
                <span className="font-semibold">Qualities : </span>
                {localdescriptionformat(breedinformation?.temperament)}
              </h2>
              <h2 className="text-xl font-poppins">
                <span className="font-semibold">Breed-group : </span>
                {breedinformation?.breed_group}
                <h2 className="text-xl font-poppins">
                  <span className="font-semibold">Life-span : </span>
                  {breedinformation?.life_span} years
                </h2>
              </h2>
              <h2 className="text-xl font-poppins">
                <span className="font-semibold">Height : </span>
                {breedinformation?.height?.metric} cm
              </h2>
              <h2 className="text-xl font-poppins">
                <span className="font-semibold">Weight : </span>
                {breedinformation?.weight?.metric} Kgs
              </h2>
              <button
                className="px-6 py-2 bg-gray-800 hover:bg-gray-900 transition-colors text-white rounded-md font-poppins text-xl"
                onClick={() =>
                  document.startViewTransition(() => navigate("/"))
                }
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
