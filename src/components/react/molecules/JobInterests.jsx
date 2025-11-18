import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";
import Select from "../atoms/Select";

export default function JobInterests( { onChange, values } ) {
    return (
        <div className="job-interests">

            <div className="desired-position">
                <Label htmlFor="desiredPosition">Desired Position</Label>
                <TextInput
                    id="desiredPosition"
                    name="desiredPosition"
                    value={values.desiredPosition || ''}
                    onChange={(e) => onChange?.('desiredPosition', e.target.value)}
                />
            </div>

            <div className="preferred-work-arrangement">
                <Label htmlFor="preferredWorkArrangement">Preferred Work Arrangement</Label>
                <Select
                    id="preferredWorkArrangement"
                    name="preferredWorkArrangement"
                    value={values.preferredWorkArrangement || ''}
                    onChange={(val) => onChange?.('preferredWorkArrangement', val)}
                    options={[
                        { value: 'onsite', label: 'Onsite' },
                        { value: 'hybrid', label: 'Hybrid' },
                        { value: 'remote', label: 'Remote' },
                    ]}
                />
            </div>

            <div className="salary-expectations">
                <Label htmlFor="salaryExpectations">Salary Expectations</Label>
                <TextInput
                    id="salaryExpectations"
                    name="salaryExpectations"
                    pattern="[0-9]+(\.[0-9]{1,2})?"
                    placeholder="e.g. 50000 or 50000.00"
                    value={values.salaryExpectations || ''}
                    onChange={(e) => onChange?.('salaryExpectations', e.target.value)}
                />
            </div>

            <div className="availability-to-start">
                <Label htmlFor="availabilityToStart">Availability to Start</Label>
                <Select
                    id="availabilityToStart"
                    name="availabilityToStart"
                    value={values.availabilityToStart || ''}
                    onChange={(val) => onChange?.('availabilityToStart', val)}
                    options={[
                        { value: 'immediately', label: 'Immediately' },
                        { value: '1-2 weeks', label: '1-2 Weeks' },
                        { value: '2-4 weeks', label: '2-4 Weeks' },
                        { value: 'more than 1 month', label: 'More than 1 Month' },
                    ]}
                />
            </div>

        </div>
    )
}