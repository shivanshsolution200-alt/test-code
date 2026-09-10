import React, {useEffect} from "react";
import meeshologo from "../images/Meesho_logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyImage from "../components/LazyImage";
import axios from "axios";
function Header() {
  const { cart } = useSelector((state) => state?.cart);
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full h-auto">
        <div className="px-[18px] py-[10px] w-full flex justify-between items-center">
          <div className="flex gap-[16px] items-center">
            <button
              type="button"
              className="border-none bg-transparent m-0 p-0"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100% 100%"
                className="w-[24px] h-[24px] mt-[5px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 17.2222C2 17.8359 2.49746 18.3333 3.11111 18.3333H20.8889C21.5025 18.3333 22 17.8359 22 17.2222C22 16.6086 21.5025 16.1111 20.8889 16.1111H3.11111C2.49746 16.1111 2 16.6086 2 17.2222ZM2 11.6667C2 12.2803 2.49746 12.7778 3.11111 12.7778H20.8889C21.5025 12.7778 22 12.2803 22 11.6667C22 11.053 21.5025 10.5556 20.8889 10.5556H3.11111C2.49746 10.5556 2 11.053 2 11.6667ZM3.11111 5C2.49746 5 2 5.49746 2 6.11111C2 6.72476 2.49746 7.22222 3.11111 7.22222H20.8889C21.5025 7.22222 22 6.72476 22 6.11111C22 5.49746 21.5025 5 20.8889 5H3.11111Z"
                  fill="#333333"
                ></path>
              </svg>
            </button>
            <LazyImage
              onClick={() => {
                navigate("/");
              }}
              src={meeshologo}
              className="w-auto h-[20px] object-cover"
            />
          </div>
          <div className="flex gap-[16px] items-center">
            <button
              type="button"
              className="border-none bg-transparent m-0 p-0"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={"0"}
                viewBox="0 0 512 512"
                className="text-red-500"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => {
                if (cart?.length > 0) {
                  navigate("/cart");
                }
              }}
              className="border-none bg-transparent m-0 p-0 relative"
            >
              {cart?.length > 0 && (
                <div className="absolute -top-2 -right-[10px] w-[20px] h-[20px] rounded-full text-[#570d48] font-bold text-[10px] bg-[rgb(255_231_251)]">
                  {cart?.length}
                </div>
              )}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={"0"}
                viewBox="0 0 576 512"
                className="text-[#570d48]"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      {/* <div className="w-full">
        <div className="relative mx-4 mt-3 mb-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            className="block w-full px-4 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white"
            placeholder="Search Sarees, Kurtis, Cosmetics, etc..."
          />
        </div>
      </div> */}
    </>
  );
}

export default Header;
