import CurrentJobTitle from "../molecules/CurrentJobTitle";
import TotalYearsExperienceSelect from "../molecules/TotalYearsExperience";
import MainIndustriesWorkedIn from "../molecules/MainIndustriesWorkedIn";
import ProfessionalSummary from "../molecules/ProfessionalSummary";

export default function ProfessionalProfile( { onChange, values, touched, setTouched, errors } ) {
    return (
        <div className="professional-profile flex flex-col gap-2">

            <span className="text-bold col-span-2">Profesional Profile</span>
            <CurrentJobTitle onChange={onChange} values={values}/>
            <TotalYearsExperienceSelect onChange={onChange} values={values} touched={touched} setTouched={setTouched} errors={errors}/>
            <MainIndustriesWorkedIn onChange={onChange} values={values}/>
            <ProfessionalSummary onChange={onChange} values={values}/>
        </div>
    )
}