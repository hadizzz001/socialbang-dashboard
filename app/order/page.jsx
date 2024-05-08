"use client"

import React from 'react'
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { fetchTemp3 } from '../utils'
import { useState, useEffect } from "react";




const page = () => {

    const [allTemp1, setTemp1] = useState()
    const [showDetails, setShowDetails] = useState([]);
    const searchParams = useSearchParams()
    const search = searchParams.get('id')







    const a = async () => {
        const b = await fetchTemp3(search)
        setTemp1(b)
        setShowDetails(Array(b.info.length).fill(false));
    }
    useEffect(() => {
        a()
    }, [])



    const handleShowMore = (index) => {
        setShowDetails((prevShowDetails) => {
            const updatedShowDetails = [...prevShowDetails];
            updatedShowDetails[index] = !updatedShowDetails[index];
            return updatedShowDetails;
        });
    };



    // const calculateFinalTotal = () => {
    //     if (allTemp1 && allTemp1.info) {
    //         return allTemp1.info.reduce((total, post) => {
    //             const price = parseInt(post.price);
    //             const qty = post.quantity;
    //             return total + (isNaN(price) || isNaN(qty) ? 0 : price * qty);
    //         }, 0);
    //     }
    //     return 0;
    // };





    const calculateFinalTotal = () => {
        if (allTemp1 && allTemp1.info) {
            const result = allTemp1.info.reduce(
                (acc, post) => {
                    const price = parseInt(post.price);
                    const qty = post.quantity;
                    acc.totalPrice += isNaN(price) || isNaN(qty) ? 0 : price * qty;
                    acc.totalItems += isNaN(qty) ? 0 : qty;
                    return acc;
                },
                { totalPrice: 0, totalItems: 0 }
            );

            return result;
        }

        return { totalPrice: 0, totalItems: 0 };
    };
    const finalTotal = calculateFinalTotal();









    console.log(allTemp1);


    return (
        <>
            <Link href='/dashboard'>
                <button type="button" className="text-white rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2" style={{ background: "#ea6a2b" }}>
                    <img src="https://res.cloudinary.com/dixtwo21g/image/upload/v1699388330/next/dmhmwrpyxkjzjzk5iurq.png" width={14} style={{ color: "white" }} alt="" />
                </button>
                Return Home
            </Link>
            <div className="bg-gray-100 h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Order #{search}</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="col-md-8">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Price</th>
                                            <th className="text-left font-semibold">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                            <th className="text-left font-semibold">Customization</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allTemp1 && Object?.keys(allTemp1).length > 0 ? (
                                            allTemp1.info.map((temp, index) => (

                                                <>
                                                    <tr>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <img 
                                                                    className="h-16 w-16 mr-4 imageMob"
                                                                    src={temp.img[0]}
                                                                    alt="Product image"
                                                                />
                                                                <span className="font-semibold">{temp.title}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">${temp.price}</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center">
                                                                <span className="text-center w-8">{temp.quantity}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-4">${temp.quantity * +temp.price}</td>

                                                        <td className="py-4"><button onClick={() => handleShowMore(index)}>Show More</button></td>

                                                    </tr>

                                                    <tr>
                                                        {showDetails[index] && (
                                                            <td className="py-4" style={{ maxWidth: "80px" }}>
                                                            {Object.keys(temp.additionalInfo).map((key) => (
                                                                <li key={key}>
                                                                    {key === 'imgz' ? (
                                                                        <span>Front cover: <Link target='_blank' href={temp.additionalInfo[key]}>View</Link></span>
                                                                    ) : key === 'imgzz' ? (
                                                                        <span>Back cover: <Link target='_blank' href={temp.additionalInfo[key]}>View</Link></span>
                                                                    ) : key === 'pdf' ? (
                                                                        <Link target='_blank' href={temp.additionalInfo[key]}>View PDF</Link>
                                                                    ) : (
                                                                        `${key.charAt(0).toUpperCase() + key.slice(1)}: ${temp.additionalInfo[key]}`
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </td>
                                                        
                                                        )}
                                                    </tr>


                                                </>
                                            ))

                                        ) : (
                                            <div className='home___error-container'>
                                                <h2 className='text-black text-xl dont-bold'>...</h2>

                                            </div>
                                        )}



                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Customer Details</h2>

                                {allTemp1 && Object?.keys(allTemp1).length > 0 ? (
                                    <>
                                        <div className="flex justify-between mb-2">
                                            <span>Name</span>
                                            <span>{allTemp1.user.fname} {allTemp1.user.lname}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Phone</span>
                                            <span>{allTemp1.user.phone}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Email</span>
                                            <span>{allTemp1.user.email}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>State</span>
                                            <span>{allTemp1.user.state}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>City</span>
                                            <span>{allTemp1.user.suburb}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>address</span>
                                            <span>{allTemp1.user.street}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Country</span>
                                            <span>{allTemp1.user.country}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>ZIP Code</span>
                                            <span>{allTemp1.user.postcode}</span>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold">Total Items</span>
                                            <span className="font-semibold">{finalTotal.totalItems}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-semibold">Total Amount</span>
                                            <span className="font-semibold">${finalTotal.totalPrice}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className='home___error-container'>
                                        <h2 className='text-black text-xl dont-bold'>...</h2>

                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page