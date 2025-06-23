import { useState } from 'react';
import ModalAddressDelete from '../Modal/ModalAddressDelete';
import { MdArrowForwardIos, MdDeleteOutline } from "react-icons/md";
import { BiHomeAlt, BiBuildingHouse } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";

const AddressBox = ({ address, name, company, phone, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    onDelete();
    setIsModalOpen(false);  // Close modal after deletion
  };

  return (
    <div className='grid grid-cols-6 border-1 rounded p-3 relative'>
      <div className='col-span-5'>
        <div className='flex gap-4 items-start'>
          <h3 className='text-lg md:text-xl font-bold'>{name}</h3>

          <div className='flex gap-2 items-center rounded-full border-1 border-purple-800 text-purple-800 px-3 h-1/2 font-semibold'>
            {address.addressType === 'HOME' ? (
              <BiHomeAlt size={20} />
            ) : address.addressType === 'WORK' ? (
              <PiSuitcaseSimpleBold size={20} />
            ) : (
              <BiBuildingHouse size={20} />
            )}
            <p>{address.addressType}</p>
          </div>

          {address?.addressType !== 'HOME' && (
            <button
              onClick={openModal}
              className='flex items-center gap-1 text-red-700 border-1 border-red-700 px-3 py-1 rounded-full hover:bg-red-50 transition-all'
              title='Delete address'
            >
              <MdDeleteOutline size={18} />
               <span className='text-sm font-semibold hidden sm:inline'>DELETE</span> 
            </button>
          )}
        </div>

        {company && (
          <h4 className='font-medium text-gray-500 mt-1'>{company}</h4>
        )}
        <h4 className='font-medium text-gray-500 mt-1'>{address.street}</h4>
        <h4 className='font-medium text-gray-500 mt-1'>
          {address.city} - {address.zipcode}
        </h4>
        <h4 className='font-medium text-gray-500 mt-1'>{address.state}</h4>
        <h4 className='font-medium text-gray-500 mt-1'>Mobile: {phone}</h4>
      </div>

      <div className='flex items-center justify-end'>
        <span className='text-gray-400'>
          <MdArrowForwardIos size={20} />
        </span>
      </div>

      {/* Always render the modal, just control its visibility */}
      <ModalAddressDelete 
        isOpen={isModalOpen}
        onCancel={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AddressBox;
