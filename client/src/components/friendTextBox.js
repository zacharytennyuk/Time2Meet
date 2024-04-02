const FriendTextBox = (props) => {
  // Event handler to update the state when the input changes
  const handleInputChange = (event) => {
    // Call the callback function passed from the App component
    props.onInputChange(event.target.value);
  };

  return (
    <div>
      <label className='text-xl text-white' htmlFor="textBox">{props.label}: </label>
      {/* Input box */}
      <input className='text-xl h-12 rounded-lg border-2 border-blue-500 size-full p-4'
        type={props.type || "text"}
        id="friendTextBox"
        value={props.inputValue}
        onChange={handleInputChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default FriendTextBox;