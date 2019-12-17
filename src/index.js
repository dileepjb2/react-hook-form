import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import useForm from 'react-hook-form';

import './styles.css';
/*
export default class App extends React.PureComponent {
  const state = {
    isValid: false
  };
  constructor(props) {
    super(props);
  }
  render(){
    return(
      
    )
  }
}*/
function App() {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange' });
  const state = {
    isValid: false
  };
  const onSubmit = data => {
    console.log(data);
  };
  useEffect(() => {
    addFriend();
  }, []);

  const addFriend = () => {
    // console.log(formState.getValues);
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeFriend = index => () => {
    // console.log(indexes());
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const clearFriends = () => {
    setIndexes([]);
  };

  const change = event => {
    console.log(event.target.value);
    // if (event.target.value === '') {
    //   this.setState({ value: false });
    // } else {
    //   this.setState({ value: true });
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexes.map(index => {
        const fieldName = `friends[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              First Name {index}:{/* <input type="text" name={`${fieldName}.firstName`} ref={register} /> */}
              <select name={`${fieldName}.firstName`} ref={register} style={{ width: 200, height: 45 }} onChange={change}>
                <option value="">Select </option>
                <option value="1">option 1</option>
                <option value="2">option 2</option>
                <option value="3">option 3</option>
                <option value="4">option 4</option>
              </select>
            </label>

            {/* <label>
              Last Name {index}:
              <input type="text" name={`${fieldName}.lastName`} ref={register} />
            </label> */}
            {/* length {indexes.length-1===index?1:0 } -{index} */}
            {index !== 0 && (
              <button type="button" onClick={removeFriend(index)}>
                Remove Account
              </button>
            )}
          </fieldset>
        );
      })}

      <button type="button" onClick={addFriend} disabled={formState.dirty && !formState.isValid}>
        Add Friend
      </button>
      {/* <button type="button" onClick={clearFriends}>
        Clear Friends
      </button> */}
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
