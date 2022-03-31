import { forwardRef } from 'react';

const Modal = forwardRef((rpops, ref) => (
  <div className='modal' ref={ref}>
    <h3>Are you sure? </h3>
    <div className='flex align-center'>
      <button className='btn m-0'>Confirm</button>
      <button className='btn btn-rev m-0'>Cancel</button>
    </div>
  </div>
));

export default Modal;
