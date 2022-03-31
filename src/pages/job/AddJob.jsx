import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../backend/api';
import ButtonSpinner from '../../components/ButtonSpinner';
import { useAppContext } from '../../context/AppContext';

const AddJob = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user } = state;
  const [values, setValues] = useState({
    id: Date.now(),
    title: '',
    company: user._id,
    position: '',
    jobType: '',
    location: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { title, position, jobType, location } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await axios.post(`${api}/job/${user._id}`, values);
      setIsLoading(false);
      dispatch({ type: 'ADD_JOB', payload: res.data });
      navigate('/company');
    } catch (error) {
      setIsLoading(false);

      console.log(error.response);
      setError(error.response.data.error);
    }
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Post a new job</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            className='form-control'
            name='title'
            id='title'
            placeholder='e.g. Frontend Web Developer'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='position'>Position</label>
          <input
            type='text'
            className='form-control'
            name='position'
            id='position'
            placeholder='e.g. Senior Software Enginner'
            value={position}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='jobType'>Job type</label>
          <select
            name='jobType'
            id='jobType'
            className='form-control'
            onChange={handleChange}
            value={jobType}
          >
            <option value='full-time'>Full-time</option>
            <option value='part-time'>Part-time</option>
            <option value='internship'>Internship</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            className='form-control'
            name='location'
            id='location'
            placeholder='e.g. Los Angeles, CA'
            value={location}
            onChange={handleChange}
          />
        </div>
        <div className='form-group my-1'>
          <button className='form-control btn btn-submit m-0' type='submit'>
            {isLoading ? <ButtonSpinner /> : 'Register'}
          </button>
        </div>
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      </form>
    </div>
  );
};
export default AddJob;
