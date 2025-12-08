import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addtocartqtyActionMinus,
    addtocartqtyActionPlus,
    addtocartremoveAction,
} from "../redux/actions/AddTocart.action";
import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

function Cartpage({ data }) {
    console.log("data",data)
    const [apiData, setapiData] = useState(data);
    const { cart } = useSelector((state) => state?.cart);
    const navigate = useNavigate();
    const allcartItem = apiData
        ?.filter((datafg) =>
            cart?.map((datamap) => datamap?.id)?.includes(datafg?.id)
        )
        ?.map((datamap) => {
            return {
                ...datamap,
                price: cart?.filter((datamapc) => datamapc?.id === datamap?.id)[0]?.free
                    ? "0"
                    : cart?.filter((datamapc) => datamapc?.id === datamap?.id)[0]
                        ?.yesnoval
                        ? (+datamap?.price + 20)?.toString()
                        : datamap?.price,
            };
        });
    const dispatch = useDispatch();
    const handleContinueData = () => {
        navigate("/addaddress");
        window?.scrollTo(0, 0);
    };
    console.log('ddddddddddddddd', allcartItem)
    const finalPriceAll = allcartItem
        ?.map(
            (datafgfh) =>
                datafgfh?.price *
                cart?.filter((datacarts) => datacarts?.id === datafgfh?.id)[0]?.qty
        )
        ?.reduce((acc, val) => acc + val, 0);
        localStorage.setItem('ordertotal', finalPriceAll)
    useEffect(() => {
        window?.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        document.body.style.backgroundColor = '#F3F4F6';
        return () => {
            document.body.style.backgroundColor = '';
        }
    }, [])
    return (
        <>
            <div className="w-full">
                <div className="w-full fixed top-0 z-[9999999]">
                    <div className="w-full bg-white px-[24px] gap-[16px] py-[16px] flex justify-start items-center border-b-[1px] border-[#cecede]">
                        <button
                            onClick={() => {
                                navigate("/");
                                window?.scrollTo(0, 0);
                            }}
                            type="button"
                            className="m-0 p-0 w-fit bg-transparent"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="#353543"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.7461 2.31408C13.5687 2.113 13.3277 2 13.0765 2C12.8252 2 12.5843 2.113 12.4068 2.31408L6.27783 9.24294C5.90739 9.66174 5.90739 10.3382 6.27783 10.757L12.4068 17.6859C12.7773 18.1047 13.3757 18.1047 13.7461 17.6859C14.1166 17.2671 14.0511 16.5166 13.7461 16.1718L8.29154 9.99462L13.7461 3.82817C13.9684 3.57691 14.1071 2.72213 13.7461 2.31408Z"
                                    className="w-[20px] h-[20px]"
                                ></path>
                            </svg>
                        </button>
                        <p className="text-[13px] w-fit text-center text-[rgb(53_53_67)] font-[500]">
                            CART
                        </p>
                    </div>
                    <div className="w-full min-w-[300px] h-full bg-white p-[8px] flex justify-center items-center border-b-[1px] border-[#cecede]">
                        <ul className="w-full flex items-center justify-center p-0 m-0 list-none">
                            <div className="flex flex-col items-center w-1/2 gap-[6px] max-w-200">
                                <div className="w-full flex items-center justify-center p-0 m-0">
                                    <div className="flex-grow h-[2px] bg-blue-500 invisible"></div>
                                    <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full border-2 border-blue-500 text-blue-500 text-sm">
                                        1
                                    </div>
                                    <div className="flex-grow h-[2px] bg-gray-300"></div>
                                </div>
                                <div className="text-[11px] font-normal text-[#353543]">Cart</div>
                            </div>
                            <div className="flex flex-col items-center w-1/2 gap-[6px] max-w-200">
                                <div className="w-full flex items-center justify-center p-0 m-0">
                                    <div className="flex-grow h-[2px] bg-gray-300 visible"></div>
                                    <div className="flex justify-center items-center w-[20px] h-[20px] rounded-full border-2 border-gray-300 text-gray-300 text-xs">
                                        2
                                    </div>
                                    <div className="flex-grow h-[2px] bg-gray-300 invisible"></div>
                                </div>
                                <div className="text-[11px] font-normal text-gray-300">Address</div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="w-full pt-[114px]">
                    {allcartItem?.map((dataitem) => {
                        return (
                            <div className="w-full h-full bg-white py-[18px] gap-3 px-[16px] flex justify-start items-start border-b-[1px] border-[#cecede]">
                                <div className="w-[60px] h-[60px]">
                                    <LazyImage
                                        src={dataitem?.image[0]}
                                        className="aspect-square w-full h-full object-cover"
                                    />
                                </div>
                                <div className="w-[calc(100%_-_84px)]">
                                    {/* <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="18"
                      rx="9"
                      fill="#2354E5"
                    ></rect>
                    <rect
                      x="1"
                      y="1"
                      width="38"
                      height="18"
                      rx="9"
                      stroke="white"
                      stroke-width="2"
                    ></rect>
                    <path
                      d="M11.8616 8.30091L10.5316 6.97095C10.3958 6.83447 10.2078 6.75 10 6.75C9.58579 6.75 9.25 7.08579 9.25 7.5V13.5C9.25 13.9142 9.58579 14.25 10 14.25C10.4142 14.25 10.75 13.9142 10.75 13.5L10.751 9.69616C10.7742 9.04511 11.2333 8.46869 11.8616 8.30091Z"
                      fill="white"
                    ></path>
                    <path
                      d="M17.25 10.3713V13.5C17.25 13.9142 17.5858 14.25 18 14.25C18.4142 14.25 18.75 13.9142 18.75 13.5V8.87132L17.25 10.3713Z"
                      fill="white"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.5303 6.96967C18.8232 7.26256 18.8232 7.73744 18.5303 8.03033L14.5303 12.0303C14.2374 12.3232 13.7626 12.3232 13.4697 12.0303L11.7197 10.2803C11.4268 9.98744 11.4268 9.51256 11.7197 9.21967C12.0126 8.92678 12.4874 8.92678 12.7803 9.21967L14 10.4393L17.4697 6.96967C17.7626 6.67678 18.2374 6.67678 18.5303 6.96967Z"
                      fill="white"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M27.25 5.75C27.6642 5.75 28 6.08579 28 6.5V13.5C28 13.9142 27.6642 14.25 27.25 14.25C26.8358 14.25 26.5 13.9142 26.5 13.5V6.5C26.5 6.08579 26.8358 5.75 27.25 5.75Z"
                      fill="white"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M30 5.75C30.4142 5.75 30.75 6.08579 30.75 6.5V13.5C30.75 13.9142 30.4142 14.25 30 14.25C29.5858 14.25 29.25 13.9142 29.25 13.5V6.5C29.25 6.08579 29.5858 5.75 30 5.75Z"
                      fill="white"
                    ></path>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.375 8.625C20.8398 8.625 19.75 10.0032 19.75 11.5C19.75 12.9968 20.8398 14.375 22.375 14.375C22.9095 14.375 23.4012 14.1353 23.7878 13.7357C23.8866 14.0344 24.1681 14.25 24.5 14.25C24.9142 14.25 25.25 13.9142 25.25 13.5V9.5C25.25 9.08579 24.9142 8.75 24.5 8.75C24.1681 8.75 23.8866 8.96556 23.7878 9.26432C23.4012 8.86467 22.9095 8.625 22.375 8.625ZM23.75 11.5005C23.75 10.7053 23.1904 10.0605 22.5 10.0605C22.0934 10.0605 21.7322 10.2841 21.5039 10.6304C21.1676 11.1219 21.1614 11.8402 21.4842 12.3399C21.7111 12.7036 22.0815 12.9405 22.5 12.9405C23.1904 12.9405 23.75 12.2958 23.75 11.5005Z"
                      fill="white"
                    ></path>
                  </svg> */}
                                    <p className="text-[13px] font-[600] text-[#353543] mb-[8px]">
                                        {dataitem?.title}
                                    </p>
                                    <p className="text-[13px] font-[500] text-[#353543] mb-[8px]">
                                        {dataitem?.price === "0" ? "Free" : "₹" + dataitem?.price}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex justify-start items-center gap-2">
                                            <p className="text-[13px] font-[500] text-[#353543]">
                                                Size :{" "}
                                                {
                                                    cart?.filter(
                                                        (datacarts) => datacarts?.id === dataitem?.id
                                                    )[0]?.sizeselect
                                                }
                                            </p>
                                            <span className="w-[4px] h-[4px] bg-[rgb(206_206_222)] rounded-full"></span>
                                            <div className="flex justify-start items-center gap-1">
                                                <p>Qty :</p>
                                                <button
                                                    type="button"
                                                    disabled={
                                                        cart?.filter(
                                                            (datacarts) => datacarts?.id === dataitem?.id
                                                        )[0]?.qty === 1
                                                    }
                                                    onClick={() => {
                                                        dispatch(addtocartqtyActionMinus(dataitem?.id));
                                                    }}
                                                    className="m-0 p-0 w-[20px] h-[20px] bg-transparent border-[1px] border-[#353543] flex justify-center items-center"
                                                >
                                                    -
                                                </button>
                                                {
                                                    cart?.filter(
                                                        (datacarts) => datacarts?.id === dataitem?.id
                                                    )[0]?.qty
                                                }
                                                <button
                                                    type="button"
                                                    disabled={dataitem?.price === "0"}
                                                    onClick={() => {
                                                        dispatch(addtocartqtyActionPlus(dataitem?.id));
                                                    }}
                                                    className="m-0 p-0 w-[20px] h-[20px] bg-transparent border-[1px] border-[#353543] flex justify-center items-center"
                                                >
                                                    +
                                                </button>{" "}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                dispatch(addtocartremoveAction(dataitem?.id));
                                            }}
                                            className="bg-transparent m-0 p-0 border-none text-gray-600 font-bold"
                                        >
                                            X Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full">
                    <div className="w-full fixed bottom-0 z-[9999999]">
                        <div className="w-full items-center justify-center flex bg-[rgb(248_248_255)]">
                            <p className="w-full text-center text-[11px] px-[16px] py-[10px] text-[rgb(53_53_67)] font-normal">
                                Clicking on ‘Continue’ will not deduct any money
                            </p>
                        </div>
                        <div className="w-full py-[12px] px-[16px] border-t-[1px] border-[#CECEDE] bg-white flex justify-between items-center">
                            <div className="w-[50%] pr-2">
                                <p className="w-fit text-[17px] text-[rgb(53_53_67)] font-bold">
                                    ₹{finalPriceAll}
                                </p>
                                <button
                                    className="w-fit uppercase text-[rgb(159_32_137)] text-[13px] font-bold border-none bg-transparent m-0 p-0"
                                    type="button"
                                >
                                    VIEW PRICE DETAILS
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    handleContinueData();
                                }}
                                className={`m-0 h-[44px] w-[50%]
                    border-[rgb(159_32_137)] p-[10px] bg-[rgb(159_32_137)] text-white text-[15px] font-[500] rounded-[4px] border-[1px] flex justify-center items-center`}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-[rgb(234_234_242)] w-full">
                    <div className="w-full h-full bg-white px-[20px] py-[16px]">
                        <p className="text-[15px] font-[600] text-[#353543]"> Price Details ( {allcartItem?.length} items )</p>
                        <div className="w-full border-b-[1px] border-[#cecede]">
                            <div className="flex justify-between items-center my-[12px]">
                                <p className="text-[13px] font-[400] text-[#353543]">
                                    Total Product Price
                                </p>
                                <p className="text-[13px] font-[400] text-[#353543]">
                                    + ₹
                                    {allcartItem
                                        ?.map(
                                            (datafgfh) =>
                                                datafgfh?.price *
                                                cart?.filter(
                                                    (datacarts) => datacarts?.id === datafgfh?.id
                                                )[0]?.qty
                                        )
                                        ?.reduce((acc, val) => acc + val, 0)}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-[10px]">
                            <p className="text-[15px] font-[600] text-[#353543] w-fit">
                                Order Total
                            </p>
                            <p className="text-[15px] font-[600] text-[#353543]">
                                ₹
                                {allcartItem
                                    ?.map(
                                        (datafgfh) =>
                                            datafgfh?.price *
                                            cart?.filter(
                                                (datacarts) => datacarts?.id === datafgfh?.id
                                            )[0]?.qty
                                    )
                                    ?.reduce((acc, val) => acc + val, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cartpage;
