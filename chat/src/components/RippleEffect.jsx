// RippleButton component adds a ripple effect to buttons when clicked.
const RippleButton = ({ children, onClick, className = "" }) => {
  // Function to create the ripple effect
  const createRipple = (event) => {
    const button = event.currentTarget; // The button that was clicked
    const circle = document.createElement("span"); // Create a span element for the ripple
    const diameter = Math.max(button.clientWidth, button.clientHeight); // Calculate the diameter of the ripple
    const radius = diameter / 2; // Calculate the radius

    // Set the size and position of the ripple
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      event.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      event.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add("ripple"); // Add the ripple class for styling

    // Remove any existing ripple before adding a new one
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    // Append the new ripple to the button
    button.appendChild(circle);
  };

  // Handles the button click and triggers the ripple effect
  const handleClick = (e) => {
    createRipple(e); // Create the ripple effect
    onClick?.(e); // Call the onClick function if provided
  };

  return (
    // Render the button with the ripple effect
    <div className={`ripple-button ${className}`} onClick={handleClick}>
      {children} {/* Render the button's children */}
    </div>
  );
};

export default RippleButton;