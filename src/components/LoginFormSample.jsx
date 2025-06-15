// pages/Home.js
// import Input from '../components/Form/Input';
// import Select from '../components/Form/Select';
// import Textarea from '../components/Form/Textarea';
// import Button from '../components/Form/Button';
import { useState } from "react";

const LoginFormSample = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error.name}
      />
      <Select
        label="Age"
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        options={[
          { value: '18-24', label: '18-24' },
          { value: '25-34', label: '25-34' },
          { value: '35-44', label: '35-44' },
        ]}
        error={error.age}
      />
      <Textarea
        label="Bio"
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        error={error.bio}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginFormSample;