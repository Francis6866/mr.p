// pages/Home.js
import Radio from '../components/Form/Radio';
import Checkbox from '../components/Form/Checkbox';
import CheckboxGroup from '../components/Form/CheckboxGroup';

const Home = () => {
  const [radioValue, setRadioValue] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = React.useState([]);

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setCheckboxValue(e.target.checked);
  };

  const handleCheckboxGroupChange = (value) => {
    setCheckboxGroupValue(value);
  };

  return (
    <div>
      <Radio
        label="Radio options"
        id="radio"
        value={radioValue}
        onChange={handleRadioChange}
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ]}
      />
      <Checkbox
        label="Checkbox"
        id="checkbox"
        checked={checkboxValue}
        onChange={handleCheckboxChange}
      />
      <CheckboxGroup
        label="Checkbox group"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={checkboxGroupValue}
        onChange={handleCheckboxGroupChange}
      />
    </div>
  );
};

export default Home;