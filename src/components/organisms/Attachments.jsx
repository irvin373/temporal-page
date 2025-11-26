import ResumeUpload from "../molecules/ResumeUpload"
import CoverLetter from "../molecules/CoverLetter"
import LinkedIn from "../molecules/LinkedIn"
import ConsentInfo from "../molecules/ConsentInfo"

export default function Attachments( {values, onChange} ){
  return(
    <section className="attachments">
      <span>Attachments / Supporting Documents</span>
      <ResumeUpload values={values} onChange={onChange}/>
      <CoverLetter values={values} onChange={onChange}/>
      <LinkedIn values={values} onChange={onChange}/>
      <ConsentInfo values={values} onChange={onChange}/>
    </section>
  )
}