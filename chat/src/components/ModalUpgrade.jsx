// ModalUpgrade displays information about subscription plans and allows users to upgrade to the Pro plan.
const ModalUpgrade = ({ isOpen, onClose }) => {

    // If the modal is not open, do not render anything.
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Button to close the modal */}
                <button className="close-modal" onClick={onClose}> X </button>

                {/* Modal title and description */}
                <h2 className="text-2xl font-semibold"> Upgrade to Pro </h2>
                <p> Get the pro plan based on the best models ever trained. </p>

                {/* Section for plan selection */}
                <div className="chose-a-plan">
                    {/* Free Plan Section */}
                    <div className="free-plan">
                        <span> Free Plan </span>
                        <p> Everything in your free plan includes </p>

                        {/* List of features included in the free plan */}
                        <ul className="includes max-w-md space-y-1">
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 1.5 Flash - <span className="min-item"> gemini-1.5-flash </span>
                            </li>
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 1.5 Pro - <span className="min-item"> gemini-1.5-pro </span>
                            </li>
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 1.5 Flash 8B - <span className="min-item"> gemini-1.5-flash-8b </span>
                            </li>
                        </ul>

                        {/* Button indicating the current plan */}
                        <button className="this-plan"> Current Plan </button>
                    </div>

                    {/* Pro Plan Section */}
                    <div className="pro-plan">
                        <div>
                            <span> Pro Plan </span>
                            <span className="price"> $80 </span>
                        </div>

                        <p> Lifetime plan that includes the best models plus those from the free plan </p>

                        {/* List of features included in the Pro plan */}
                        <ul className="includes max-w-md space-y-1">
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 2.0 Flash - <span className="min-item"> gemini-2.0-flash </span>
                            </li>
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 2.0 Pro - <span className="min-item"> gemini-2.0-pro </span>
                            </li>
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 2.5 Pro - <span className="min-item"> gemini-2.5-pro </span>
                            </li>
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Gemini 2.0 Flash Experimental - <span className="min-item"> Generate Images </span>
                            </li>
                            <li className="item flex items-center">
                                <svg className="w-6 h-6 me-2 text-[#FFF2D7] shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Imagen 3 - <span className="min-item"> Generate Images </span>
                            </li>
                        </ul>

                        {/* Button to upgrade to the Pro plan */}
                        <button className="this-plan"> Upgrade to Pro Plan </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ModalUpgrade;
