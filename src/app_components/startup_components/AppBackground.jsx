/*AppBackground.jsx*/
import "./AppBackground.css";

const AppBackground = () => {
  return (
    <div className="signup-background">
      {/* Left Circles */}
      <div className="circle-group left">
        {[1230, 1130, 1030, 930, 830, 730].map((size, index) => (
          <div key={index} className="circle" style={{ width: size, height: size, left: -250 + index * 50, top: 100 + index * 50 }} />
        ))}
      </div>

      {/* Right Circles */}
      <div className="circle-group right">
        {[1230, 1130, 1030, 930, 830, 730].map((size, index) => (
          <div key={index} className="circle" style={{ width: size, height: size, left: 939 + index * 50, top: -250 + index * 50 }} />
        ))}
      </div>

      {/* Signup Box */}
      <div className="signup-box"></div>
    </div>
  );
};

export default AppBackground;
