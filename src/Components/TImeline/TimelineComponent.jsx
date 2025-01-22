import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Box, Typography } from '@mui/material';
const TimelineComponent = () => {
  return (
    <div>
       <div class="flex items-end max-w-screen-lg mx-auto">
      <div class="w-full">
        <h6 class="text-sm font-bold text-green-500 mb-2 mr-4">Order Confirmed</h6>
        <div class="flex items-center w-full">
          <div
            class="w-7 h-7 z-50 shrink-0 mx-[-1px] border-2 border-green-500 flex items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-green-500" viewBox="0 0 24 24">
              <path
                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                data-original="#000000" />
            </svg>
          </div>
          <div class="w-full h-[3px] bg-green-500"></div>
        </div>
      </div>
      <div class="w-full">
        <h6 class="text-sm font-bold text-green-500 mb-2 mr-4">Shipped</h6>
        <div class="flex items-center w-full">
          <div
            class="w-7 h-7 z-50 shrink-0 mx-[-1px] border-2 border-green-500 flex items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-green-500" viewBox="0 0 24 24">
              <path
                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                data-original="#000000" />
            </svg>
          </div>
          <div class="w-full h-[3px] bg-green-500"></div>
        </div>
      </div>
      <div class="w-full">
        <h6 class="text-sm font-bold text-green-500 mb-2 mr-4">Out For Delivery</h6>
        <div class="flex items-center w-full">
          <div
            class="w-7 h-7 z-50 shrink-0 mx-[-1px] border-2 border-green-500 flex items-center justify-center rounded-full">
            <span class="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <div class="w-full h-[3px] bg-gray-300"></div>
        </div>
      </div>
      <div>
        <h6 class="text-sm font-bold text-gray-300 w-max mb-2">Delivered</h6>
        <div class="flex items-center">
          <div class="w-7 h-7 z-50 shrink-0 mx-[-1px] border-2 border-gray-300 flex items-center justify-center rounded-full">
            <span class="text-sm text-gray-400 font-bold">4</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default TimelineComponent