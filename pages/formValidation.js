import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function FormValidation() {

    const programmingLanguages = [
        { id: 1, name: 'Javascript' },
        { id: 2, name: 'Java' },
        { id: 3, name: 'Python' }
    ]

    const countries = [
        { id: 1, name: 'Select your country' },
        { id: 2, name: 'India' },
        { id: 3, name: 'USA' },
        { id: 4, name: 'Canada' }
    ]

    const schema = yup.object().shape({
        firstName: yup.string().required('Please enter your first name'),
        languagesKnown: yup.array()
            .min(1, 'Please select atleast one programming language'),
        country: yup.string().test('country', 'Please select your country', (v) => {
            return v !== 'Select your country'
        })
    })

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            gender: 'female',
            country: 'Select your country',
            languagesKnown: [],
        },
        resolver: yupResolver(schema)
    })

    const checkError = (propertyName) => {
        return errors.hasOwnProperty(propertyName)
    }

    const submit = (data) => {
        console.log({ data })
    }

    console.log({ errors })
    return (
        <Container>
            <form onSubmit={handleSubmit(submit)}>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type='text'
                            label='First Name'
                            error={checkError('firstName')}
                            {...register('firstName')}
                        />
                        <ErrorMessage errors={errors}
                            name="firstName"
                            render={({ message }) => <Message message={message} />} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type='text'
                            label='Last Name'
                            {...register('lastName')}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel>Programming languages known</FormLabel>
                        <br />
                        {
                            programmingLanguages.map(language => <FormControlLabel key={language.id}
                                control={<Checkbox
                                    value={language.name}
                                    {...register('languagesKnown')} />}
                                label={language.name} />)
                        }
                        <ErrorMessage errors={errors}
                            name="languagesKnown"
                            render={({ message }) => <Message message={message} />} />
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <Controller
                            control={control}
                            name='gender'
                            render={({ field }) => <RadioGroup
                                {...field}
                            >
                                <FormControlLabel value="female" key='1' control={<Radio />} label="Female" />
                                <FormControlLabel value="male" key='2' control={<Radio />} label="Male" />
                                <FormControlLabel value="other" key='3' control={<Radio />} label="Other" />
                            </RadioGroup>}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormLabel>Please select your country</FormLabel>
                    <Controller
                        name='country'
                        control={control}
                        render={({ field }) => <Select
                            fullWidth
                            defaultValue='India'
                            error={checkError('country')}
                            {...field}
                        >
                            {countries.map(country => <MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>)}
                        </Select>}
                    />
                    <ErrorMessage errors={errors}
                        name="country"
                        render={({ message }) => <Message message={message} />} />
                </Grid>
                <Button style={{ background: 'black', color: 'white' }} type='submit'>Submit</Button>
            </form>
        </Container>
    )
}

const Message = ({ type = 'error', message = '' }) => {

    const messageType = {
        error: '#d32f2f',
        success: 'green',
        warning: 'yellow'
    }

    return <p style={{
        color: messageType[type]
    }}>
        {message}
    </p>
}
