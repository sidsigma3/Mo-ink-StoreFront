import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Box, Typography } from '@mui/material';


const TimelineComponent = ({ orderStatus }) => {


  const statusOptions = [
    { key: "NEW", label: "New Order" },
    { key: "CONFIRMED", label: "Confirmed" },
    { key: "MANUFACTURING", label: "Manufacturing" },
    { key: "SHIPPED", label: "Shipped" },
    { key: "DELIVERED", label: "Delivered" },
    { key: "RETURNED", label: "Returned" }, // 👈 Add this line
  ];

  // Find the index of the current status
  const currentIndex = statusOptions.findIndex(option => option.key === orderStatus);

  return (
    <div className="flex items-end max-w-screen-lg mx-auto">
      {statusOptions.map((status, index) => {
        const isCompleted = index <= currentIndex;
        const isLast = index === statusOptions.length - 1;

        return (
          <div key={status.key} className="w-full">
            {/* Label */}
            <h6 className={`text-sm font-bold ${isCompleted ? 'text-green-500' : 'text-gray-300'} mb-2 mr-4`}>
              {status.label}
            </h6>

            {/* Dot + Line */}
            <div className="flex items-center w-full">
              {/* Dot */}
              <div
                className={`w-7 h-7 z-50 shrink-0 mx-[-1px] border-2 ${
                  isCompleted ? 'border-green-500' : 'border-gray-300'
                } flex items-center justify-center rounded-full`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-green-500" viewBox="0 0 24 24">
                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                  </svg>
                ) : (
                  <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                )}
              </div>

              {/* Line (not for last item) */}
              {!isLast && (
                <div className={`w-full h-[3px] ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineComponent;
