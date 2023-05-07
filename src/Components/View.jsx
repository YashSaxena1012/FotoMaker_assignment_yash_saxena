//import statements
import React, { useEffect } from 'react'
import { useState } from 'react'

const View = ({ slots }) => {

  //states and constants used in the program
  const [clearAll, setClearAll] = useState(false);

  //to handle clearAll
  const handleClick = () => {
    setClearAll(false);
    localStorage.clear();
    window.location.reload()
  }

  // to toggle clearAll according to data on localstorage
  useEffect(() => {
    if (slots.length > 0) {
      setClearAll(true);
    } else {
      setClearAll(false);
    }
  }, [slots]);


  return (
    <div className=" rounder-md shadow-lg  booked-slots h-fit text-black flex relative top-20 text-center flex-col gap-4 border-2 border-zinc-500 w-2/3 mx-auto p-2">
      <h2 className='border-b-2 text-3xl font-bold text-gray-800'>MY BOOKED SLOTS</h2>
      <table className='text-slate-800'>
        <thead>
          <tr className='text-gray-100  bg-slate-800'>
            <th>#</th>
            <th>Name</th>
            <th>Slot</th>
          </tr>
        </thead>
        <tbody>
          {slots.map(({ name, slot }, index) => {
            return (
              <tr key={index} className=" text-center font-medium hover:bg-[rgba(0,0,0,0.6)] hover:text-white">
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{slot}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {clearAll ?
        <button onClick={() => handleClick()} className="flex items-center justify-center px-4 py-2 text-base font-medium leading-6 hover:border-white hover:border-2 w-1/2 m-auto hover:shadow-lg hover:text-gray-100 whitespace-no-wrap hover:bg-gray-500 border-2 border-transparent rounded-full shadow-md bg-white text-black border-black focus:outline-none">
          CLEAR ALL
        </button>
        : <h2 className='text-xl font-bold text-gray-500'>NO BOOKINGS YET</h2>
      }
    </div>
  )
}

export default View
