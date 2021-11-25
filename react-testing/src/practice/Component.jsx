import React, { useReducer, useState } from 'react';
import axios from 'axios';

const initialState = {
  error: null,
  greeting: null,
};

const greetingReducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      };
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      };
    }

    default: {
      return state;
    }
  }
};

const Component = ({ url }) => {
  const [{ error, greeting }, dispatch] = useReducer(greetingReducer, initialState);

  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchGreeting = async url => {
    try {
      const { data } = await axios.get(url);
      const { greeting } = data;
      dispatch({ type: 'SUCCESS', greeting });
      setButtonClicked(true);
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };

  const buttonText = buttonClicked ? 'Ok' : '데이터 가져오기';

  return (
    <div>
      {greeting && <h1>{greeting}</h1>}
      <button onClick={() => fetchGreeting(url)} disabled={buttonClicked}>
        {buttonText}
      </button>
      {error && (
        <p role='alert' style={{ color: 'red' }}>
          데이터 요청에 실패했습니다.
        </p>
      )}
    </div>
  );
};

export default Component;
