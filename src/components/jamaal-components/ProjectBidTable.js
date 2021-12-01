import React from 'react';


function ProjectBidTable() {

  return (

    <div className="container mx-auto xl:max-w-7xl ">
      <div className="rounded-xl min-w-full  overflow-x-auto bg-gray-800  ">

      <table className="min-w-full text-sm align-middle text-center">

      <thead>
        <tr className="bg-gray-700">
          <th
            className="p-3 text-sm font-semibold tracking-wider  text-gray-300 uppercase bg-gray-700"
          >
            Date
          </th>
          <th
            className="p-3 text-sm text-center font-semibold tracking-wider sm:text-left text-gray-300 uppercase bg-gray-700"
          >
            Quantity
          </th>
          <th
            className="hidden p-3 text-sm font-semibold tracking-wider text-center text-gray-300 uppercase bg-gray-700 md:table-cell"
          >
            Total (ETH)
          </th>
          <th
            className="p-3 text-sm font-semibold tracking-wider text-center text-gray-300 uppercase bg-gray-700"
          >
            Status
          </th>
          <th
            className="p-3 text-sm font-semibold tracking-wider text-center text-gray-300 uppercase bg-gray-700"
          >
            Cancel
          </th>
        </tr>
      </thead>

   

      <tbody>
        <tr>
          <td className="p-3">
            <p className="font-medium">
              01/11
            </p>
            <p className="text-gray-500">
              2021
            </p>
          </td>
          <td className="p-3 text-center text-gray-500 sm:text-left md:table-cell">
            3
          </td>
          <td className="hidden p-3 text-center text-gray-500 md:table-cell">
            0.4323452
          </td>
          <td className="p-3 text-center">
            <span
              className="inline-block w-4 h-4 bg-green-300 rounded-full md:hidden"
              >&nbsp;</span
            >
            <div
              className="hidden px-2 py-1 text-xs font-semibold leading-4 text-green-700 bg-green-200 rounded-full md:inline-block"
            >
              Live
            </div>
          </td>
          <td className="p-3 text-center">
           <button
             type="button"
             className="inline-flex items-center justify-center px-2 py-1 space-x-2 text-sm font-semibold leading-5 text-gray-800 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:text-gray-800 hover:bg-gray-700 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
           >
           <svg className="inline-block w-5 h-5 hi-solid hi-x" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
   
           </button>
         </td>
        </tr>
        <tr>
   
          <td className="p-3">
            <p className="font-medium">
              04/11
            </p>
            <p className="text-gray-500">
              2021
            </p>
          </td>
          <td className="p-3 text-center text-gray-500 sm:text-left md:table-cell">
            1
          </td>
          <td className="hidden p-3 text-center text-gray-500 md:table-cell">
           0.4323452
         </td>
         <td className="p-3 text-center">
           <span
             className="inline-block w-4 h-4 bg-green-300 rounded-full md:hidden"
             >&nbsp;</span
           >
           <div
             className="hidden px-2 py-1 text-xs font-semibold leading-4 text-green-700 bg-green-200 rounded-full md:inline-block"
           >
             Live
           </div>
         </td>
         <td className="p-3 text-center">
           <button
             type="button"
             className="inline-flex items-center justify-center px-2 py-1 space-x-2 text-sm font-semibold leading-5 text-gray-800 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:text-gray-800 hover:bg-gray-700 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
           >
           <svg className="inline-block w-5 h-5 hi-solid hi-x" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
   
           </button>
         </td>
        </tr>
        <tr>
   
          <td className="p-3">
            <p className="font-medium">
             04/11
            </p>
            <p className="text-gray-500">
              2021
            </p>
          </td>
          <td className="p-3 text-center text-gray-500 sm:text-left md:table-cell">
           2
          </td>
          <td className="hidden p-3 text-center text-gray-500 md:table-cell">
           0.4323452
         </td>
          <td className="p-3 text-center align-middle">
            <span
              className="inline-block w-4 h-4 bg-orange-300 rounded-full md:hidden"
              >&nbsp;</span
            >
            <div
              className=" px-2 py-1 text-xs font-semibold leading-4 text-orange-700 bg-orange-200 rounded-full md:inline-block"
            >
              Cancelled
            </div>
          </td>
          <td className=" p-3 text-center text-gray-500 md:table-cell">
           N/A
         </td>
          
        </tr>
        <tr>
   
          <td className="p-3">
            <p className="font-medium">
             04/11
            </p>
            <p className="text-gray-500">
             2021
            </p>
          </td>
          <td className="p-3 text-center text-gray-500 sm:text-left md:table-cell">
            2
          </td>
          <td className="hidden p-3 text-center text-gray-500 md:table-cell">
           0.4323452
         </td>
          <td className="p-3 text-center">
            <span
              className="inline-block w-4 h-4 bg-green-300 rounded-full md:hidden"
              >&nbsp;</span
            >
            <div
              className="hidden px-2 py-1 text-xs font-semibold leading-4 text-green-700 bg-green-200 rounded-full md:inline-block"
            >
              Live
            </div>
          </td>
          <td className="p-3 text-center">
   
   
           
            <button
              type="button"
              className="inline-flex items-center justify-center px-2 py-1 space-x-2 text-sm font-semibold leading-5 text-gray-800 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:text-gray-800 hover:bg-gray-700 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
            >
   
            <svg className="inline-block w-5 h-5 hi-solid hi-x" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
        
   
   
   
            </button>
          </td>
        </tr>
    
      </tbody>

      </table>

   </div>
   </div>

  )
}

export default ProjectBidTable