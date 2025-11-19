import { StrictMode } from "react"
import {useState} from "react";
import BasicInformation from "../molecules/BasicInformation";


export function Apply(){
    const footerSpanColor = '#4B5666';
    const footerSpanStyle = {color: footerSpanColor}

    const [step, setStep] = useState(1);

    function renderStep(){
        switch(step){
            case 1: return <BasicInformation onChange={Apply} values={Apply}/>
            default: return null;
        }
    }

    function handleNext() {
        if (step < 5) setStep(step + 1);
    }
    function handleBack() {
        if (step > 1) setStep(step - 1);
    }



    return(
        <StrictMode>
            <form className="apply flex flex-col items-center justify-center min-h-screen bg-white gap-y-[44px]">

                <header className="text-center py-8">
                    <h2 className="apply__title text-[42px] text-3xl font-bold text-gray-800 mb-2">Apply Now</h2>
                    <span className="apply__title-text text-[24px] text-base text-gray-600">
                        Ready to join our team? Submit your application and we'll get back to you soon.
                    </span>
                </header>

                <div className="apply__steps flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                        <span
                            key={n}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                            step === n ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                            }`}
                            >
                            {n}
                        </span>
                    ))}
                </div>


                <section className="carousel component border w-max h-max">
                    <header>
                        <label htmlFor="carousel component px-2">{`STEP ${step} OF 5`}</label>
                    </header>

                    <div className="carousel">
                        {renderStep()}
                    </div>


                </section>

                <div className="margin-reference-for-buttons flex flex-col  gap-y-[44px] items-center">

                    <div className="buttonsCarousel w-full flex justify-between gap-4 mt-6">

                            <button onClick={handleBack} disabled={step === 1} className="w-[180px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                &lt; Back
                            </button>
                            <button onClick={handleNext} className="w-[180px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                {step === 5 ? "Submit" : "Next >"}
                            </button>

                    </div>

                    <footer className="apply__footer flex flex-col items-center">
                        <span style={ footerSpanStyle } className="apply__footer-text text-[21.26px]">* Required fields. Applications are reviewed on a rolling basis.</span>
                        <span style={ footerSpanStyle } className="apply__footer-text text-[21.26px]">We will contact qualified candidates within 2 weeks.</span>
                    </footer>

                </div>

            </form>
        </StrictMode>
    )
}