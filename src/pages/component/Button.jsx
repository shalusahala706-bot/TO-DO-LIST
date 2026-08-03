import "./Button.css";

const TechBtn = ({
  text,
  type = "button",
  onClick,
  color,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="btn"
      style={{ background:color}}
    >
      {text}
    </button>
  );
};

export default TechBtn;
