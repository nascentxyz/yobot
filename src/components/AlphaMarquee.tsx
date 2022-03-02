const AlphaMarquee = ({ isAlpha = true }) => {
  if (isAlpha) {
    return (
      <div className="relative flex overflow-x-hidden">
        <div className="py-4 animate-marquee whitespace-nowrap bg-black text-white font-Rubik text-sm">
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
        </div>

        <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap bg-black text-white font-Rubik text-sm">
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
          <span className="mx-4">YOBOT IS IN ALPHA — USE AT YOUR OWN RISK</span>
        </div>
      </div>
    );
  }
};

export default AlphaMarquee;
