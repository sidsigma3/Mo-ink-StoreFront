import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";


const ModalAddress = ({show,handleClose}) => {
  return (
    <div>
        <Modal show={show} onHide={handleClose} centered>
            <ModalHeader>
                <ModalTitle>Add new Address</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>First name</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Last name</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>WhatsApp number</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Calling number</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Company name</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Apartmet, suite, etc</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Country / Region</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>State</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>City</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>PIN code</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>


                </div>

                <div>
                    <h4 className='font-semibold mt-8'>Type of Address</h4>
                    <div className='flex gap-2 mt-2'>
                         <div className='flex gap-2 items-center rounded-full border-1 border-violet-800 text-violet-800 px-3 font-semibold'>
                            <span><BiHomeAlt /></span>
                            <p>HOME</p>
                        </div>

                        <div className='flex gap-2 items-center rounded-full border-1 border-violet-800 text-violet-800 px-3 font-semibold'>
                            <span><PiSuitcaseSimpleBold /></span>
                            <p>WORK</p>
                        </div>

                        <div className='flex gap-2 items-center rounded-full border-1 border-violet-800 text-violet-800 px-3 font-semibold'>
                            <span><BiBuildingHouse /></span>
                            <p>OTHERS</p>
                        </div>
                    </div>
                </div>

            </ModalBody>

            <ModalFooter className='justify-content-between'>
             
                    <button className='bg-gray-300 text-white px-5 py-2'>CANCEL</button>
                    <button className='bg-violet-800 text-white px-5 py-2'>SAVE ADDRESS</button>
             

            </ModalFooter>
        </Modal>


    </div>
  )
}

export default ModalAddress