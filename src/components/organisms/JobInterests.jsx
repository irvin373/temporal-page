import DesiredPosition from "../molecules/DesiredPosition";
import PreferredWorkArrangement from "../molecules/PreferredWorkArrangement";
import AvailabilityToStart from "../molecules/AvailabilityToStart";
import SalaryExpectations from "../molecules/SalaryExpectations"

export default function JobInterests( { onChange, values } ) {
  return (
    <div className="job-interests">

      <span>Job Interests</span>

      <DesiredPosition values={values} onChange={onChange}/>
      <PreferredWorkArrangement values={values} onChange={onChange}/>
      <AvailabilityToStart values={values} onChange={onChange}/>
      <SalaryExpectations values={values} onChange={onChange}/>

    </div>
  )
}