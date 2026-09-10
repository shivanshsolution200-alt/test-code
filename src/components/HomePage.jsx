import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import homepagebannergif from "../images/pngmeesho.jpg";
import bomb from "../images/bomb.png";
import thustedimg from "../images/thrustedimg2.png";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import heart from "../images/wishlist.svg";
import LazyImage from "./LazyImage";
import LazyloaderImage from "./LazyloaderImage";
function HomePage({ data }) {
  const initialTime = 15 * 60;
  const [time, setTime] = useState(initialTime);
  const [activebanner, setactivebanner] = useState(0);
  const [homeimagesilder, setHomeimagesilder] = useState([]);
  const [homepagebigbannersilder, setHomepagebigbannersilder] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    const countDown = () => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        setTime(initialTime);
      }
    };
    timer = setInterval(countDown, 1000);
    return () => clearInterval(timer);
  }, [time, initialTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return {
      min: `${minutes < 10 ? "0" : ""}${minutes}`,
      sec: `${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`,
    };
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch slider configuration from JSON
    fetch('/slider-config.json')
      .then(response => response.json())
      .then(config => {
        setHomeimagesilder(config.topSlider || []);
        setHomepagebigbannersilder(config.bigBannerSlider || []);
      })
      .catch(error => {
        console.error('Error loading slider configuration:', error);
      });
  }, []);

  const handleProductview = (id, name) => {
    // dispatch(productViewAction(id));
    navigate("/productdetails/" + id + "/" + name);
  };
  return (
    <>
      <div className="w-full ">
        <div className="w-full px-[16px] py-[8px]">
          <Swiper slidesPerView={5} spaceBetween={30}>
            {homeimagesilder.map((datahome, index) => {
              return (
                <SwiperSlide key={`homeimage-${index}`}>
                  <div className="w-full">
                    <LazyImage
                      src={datahome}
                      className="object-contain rounded-full h-[80px] w-[90px]"
                    />

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="py-2 w-screen">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
            onActiveIndexChange={(swiper) => setactivebanner(swiper?.activeIndex)}
          >
            {homepagebigbannersilder.map((datahome, index) => (
              <SwiperSlide key={index} className="w-full">
                <LazyImage
                  src={datahome}
                  className="w-full h-[200px] object-contain rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center items-center gap-2 mt-2">
            {homepagebigbannersilder.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-[4px] rounded-full ${index === activebanner
                    ? "w-[12px] bg-[rgb(159_32_137)]"
                    : "w-[8px] bg-[rgb(234_234_242)]"
                  }`}
              ></button>
            ))}
          </div>
        </div>

        <marquee className="bg-[#570d48] py-[10px] text-white text-[16px]">
          Buy 2 Get 1 Free (Add 3 item to cart)
        </marquee>
        <div className="bg-slate-100 py-2 w-full">
          <div className="bg-white pt-[8px]">

            <div className="w-full flex justify-center gap-[18px] items-center pt-3 pb-1">
              <div className="flex items-center gap-[10px]">
                <p className="text-[18px] text-gray-700 font-bold font-sans">
                  Flipkart Daily Deals
                </p>
                <svg
                  width="19"
                  height="22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  iconsize="20"
                  className="sc-bcXHqe bMWbfM"
                >
                  <mask
                    id="deal_svg__a"
                    mask-type="alpha"
                    maskUnits="userSpaceOnUse"
                    x="1"
                    y="0"
                    width="17"
                    height="22"
                  >
                    <path
                      d="M5.198.795a.73.73 0 0 0-.699.522l-2.621 8.858a1.458 1.458 0 0 0 1.568 1.862l6.018-.708L6.835 19.8a1.089 1.089 0 0 0 1.944.929l8.174-12.206c.698-1.043-.16-2.423-1.405-2.257l-5.033.671 1.724-5.183a.73.73 0 0 0-.692-.96H5.198Z"
                      fill="#fff"
                    ></path>
                  </mask>
                  <g mask="url(#deal_svg__a)">
                    <path
                      fill="#E11900"
                      d="M-.208.947H18.75v21.875H-.208z"
                    ></path>
                  </g>
                </svg>
              </div>
              <div className="inline-flex items-center whitespace-nowrap font-nums bg-orange-200 rounded-md h-[20px] px-[8px] border border-orange-500">
                <LazyImage
                  className={'w-[16px] h-[16px] object-contain'}
                  width="16"
                  height="16"
                  src={bomb}
                />
                <span className="text-[#570d48] font-semibold text-[13px] leading-[16px] ml-[5px] p-0">
                  00h : {formatTime(time)?.min}m : {formatTime(time)?.sec}s
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white mt-2 py-2 px-4 font-semibold text-black">
            Products For You
          </div>
          <div className="mx-0 grid grid-cols-2 text-sm mt-0 gap-0 bg-white">
            {data.map((dataproduct, inx) => {
              return (
                <div
                  className="border border-slate-200 p-3 relative"
                  key={inx}
                  onClick={() => {
                    handleProductview(dataproduct?.id, dataproduct?.title);
                  }}
                >
                  <div className="absolute right-2 top-2">
                    <button
                      type="button"
                      className="m-0 p-0 bg-transparent border-none"
                    >
                      <img
                        src={heart}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                  <div className="h-[175px] flex items-center justify-center">
                    <LazyloaderImage
                      src={dataproduct?.image[0]}
                      className="max-h-[180px] mx-auto"
                    />
                  </div>
                  <p className="mt-2 text-[12px] font-normal whitespace-nowrap overflow-hidden text-ellipsis">
                    {dataproduct?.title}
                  </p>
                  <p className="mt-2 flex items-center">
                    <span className="text-[16px]">
                      ₹{dataproduct?.price}
                    </span>
                    <span className="text-gray-400 line-through ml-2 text-[12px] mr-3">
                      ₹{dataproduct?.cancelprice}
                    </span>
                  </p>
                  <div className="flex justify-start items-center gap-[10px]">
                    <div className="bg-slate-100 text-slate-600 rounded-full text-[12px] w-fit px-2 py-[1px] mt-2">
                      {" "}
                      Free delivery
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[13px]">
                    <div className="flex items-center">
                      <div className="bg-[#038d63] px-[5px] py-[2px] rounded-full text-white flex items-center mr-2">
                        {dataproduct?.rate}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={"0"}
                          viewBox="0 0 576 512"
                          className="ml-1 mt-[-2px]"
                          height="11"
                          width="11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                        </svg>
                      </div>
                      <div className="text-slate-400 text-[12px]">
                        ({dataproduct?.ratenum?.toLocaleString()})
                      </div>
                    </div>
                    <img src={thustedimg} className="h-[22px]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
