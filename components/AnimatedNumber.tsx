import React from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = '', className = '' }) => {
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (value - start) + start);
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <div className={className}>{display.toLocaleString()}{suffix}</div>;
};

export default AnimatedNumber;