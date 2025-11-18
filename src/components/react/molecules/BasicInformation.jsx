import Label from '../atoms/Label';
import TextInput from '../atoms/TextInput';
import RadioGroup from '../atoms/RadioGroup';

function BasicInformation( { onChange, values: form, errors } ) {
    return (
        <div className="Basic--Information">

            <div className="fullName">
                <Label htmlFor="fullName" required>Full Name</Label>
                <TextInput
                    id="fullName"
                    name="fullName"
                    placeholder="type your full name"
                    value={form.fullName || ''}
                    onChange={val => onChange('fullName', val)}
                    required
                    error={errors?.fullName}
                />
            </div>

            <div className="Email--and--Phone">

                <Label htmlFor="emailAddress" required>Email</Label>
                <TextInput
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    placeholder="type your email address"
                    value={form.emailAddress || ''}
                    onChange={val => onChange('emailAddress', val)}
                    required
                    error={errors?.emailAddress}
                />

                <Label htmlFor="phoneNumber" required>Phone Number</Label>
                <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="e.g. +54 11 1234 5678"
                    pattern="\+?[0-9\s\-]+"
                    value={form.phoneNumber || ''}
                    onChange={val => onChange('phoneNumber', val)}
                    required
                    error={errors?.phoneNumber}
                />
            </div>

            <div className="residence">
                <Label htmlFor="city" required>City</Label>
                <TextInput
                    id="city"
                    name="city"
                    value={form.city || ''}
                    onChange={val => onChange('city', val)}
                    required
                    error={errors?.city}
                />

                <Label htmlFor="state" required>State</Label>
                <TextInput
                    id="state"
                    name="state"
                    value={form.state || ''}
                    onChange={val => onChange('state', val)}
                    required
                    error={errors?.state}
                />

                <Label htmlFor="country" required>Country</Label>
                <TextInput
                    id="country"
                    name="country"
                    value={form.country || ''}
                    onChange={val => onChange('country', val)}
                    required
                    error={errors?.country}
                />
            </div>

            <div className="Relocate--Travel">
                <Label required>Are you willing to relocate or travel?</Label>
                <RadioGroup
                    name="relocateTravel"
                    options={[
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' },
                        { label: 'Maybe', value: 'maybe' },
                    ]}
                    value={form.relocateTravel || ''}
                    onChange={val => onChange('relocateTravel', val)}
                    required
                />
            </div>
        </div>
    )
};

export default BasicInformation;