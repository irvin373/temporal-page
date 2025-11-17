import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";
import Select from "../atoms/Select";

export default function JobInterests() {
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
                    onChange={(e) => onChange?.('preferredWorkArrangement', e.target.value)}
                >
                    <option value="">-- Select work arrangement --</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                </Select>
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
                    onChange={(e) => onChange?.('availabilityToStart', e.target.value)}
                >
                    <option value="">-- Select availability --</option>
                    <option value="immediately">Immediately</option>
                    <option value="1week">In 1 week</option>
                    <option value="2weeks">In 2 weeks</option>
                    <option value="1month">In 1 month</option>
                    <option value="other">Other</option>
                </Select>
            </div>

        </div>
    )
}