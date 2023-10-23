import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ValidationError from '../utils/ValidationError';
import { useNavigate } from 'react-router';
import { UserDTO } from '../services/DTO/UserDTO';
import { loginUser } from '../features/user/actions/loginUser';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function LoginPage() {

  const dispatch = useAppDispatch();

  const { error, loading} = useAppSelector(state => state.account);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const validationErrors = ValidationError.validate(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const dto: UserDTO = { ...formData, username: formData.username };
    dispatch(loginUser(dto));
  };
  const failedValidationStyles = {
    outline: '1px solid red',
  };

  useEffect(() => {
    if (!error) return navigate('/table');
  }, [error]);

  if (loading) return <Loader />;

  return <main className="main">
    <form className="main__login" onSubmit={handleSubmit}>
      <h2 className='main__welcome'>Welcome</h2>
      { error && <ErrorMessage error={error} />}
      <input type='text'
             id="username"
             name="username"
             placeholder="Username"
             className="main__input"
             required
             onChange={handleChange}
             style={errors.some(error => error.type === 'username') ? failedValidationStyles : {}}/>
      {errors.some(error => error.type === 'email') && <p style={{ 'color': 'red' }}>Invalid username</p>}
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        className="main__input"
        required
        onChange={handleChange}
        style={errors.some(error => error.type === 'password') ? failedValidationStyles : {}}
      />
      {errors.some(error => error.type === 'password') && <p style={{ 'color': 'red' }}>Invalid password</p>}
      <div className="main__checkbox-container control-group">
        <label className="control control-checkbox">
          Remember me
          <input type="checkbox" name="remember"/>
          <div className='control_indicator'/>
        </label>
      </div>
      <input type='submit' value='Login' className='main__submit' />
    </form>
  </main>;
}
