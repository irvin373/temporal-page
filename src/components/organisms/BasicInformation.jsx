import City from "../molecules/City";
import CountryOfResidence from "../molecules/CountryOfResidence";
import EmailAddress from "../molecules/EmailAddress";
import FullName from "../molecules/FullName";
import PhoneNumber from "../molecules/PhoneNumber";
import State from "../molecules/State";
import WillingnessRelocateTravel from "../molecules/WillingnessRelocateTravel";

export default function BasicInformation({ values, onChange, errors, touched, setTouched }) {
  return (
      <section className="basic-information grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full max-w-full">
        <span className="text-bold col-span-2">Basic Information</span>
        <FullName 
          values={values} 
          onChange={onChange} 
          errors={errors} 
          touched={touched} 
          setTouched={setTouched}/>
        <EmailAddress values={values} onChange={onChange} errors={errors} touched={touched} setTouched={setTouched}/>
        <CountryOfResidence />
        <PhoneNumber values={values} onChange={onChange}  errors={errors} touched={touched} setTouched={setTouched}/>
        <City values={values} onChange={onChange} errors={errors}/>
        <State values={values} onChange={onChange} errors={errors}/>
        <WillingnessRelocateTravel values={values} onChange={onChange}/>
    </section>
  );
}