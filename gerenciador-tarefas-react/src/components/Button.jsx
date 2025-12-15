function Button(props) {
  return (
    <button className="bg-violet-500 text-white p-2 rounded-xl" {...props}>
      {props.children}
    </button>
  );
}

export default Button;
