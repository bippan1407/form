import { Container, Grid, TextField, Button, FormLabel, Checkbox, FormControl, FormGroup, FormControlLabel, RadioGroup, Radio, Select, MenuItem, Switch, Slider } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'

export default function SimpleFormHandling() {

  const programmingLanguages = [
    { id: 1, name: 'Javascript' },
    { id: 2, name: 'Java' },
    { id: 3, name: 'Python' }
  ]

  const countries = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'Canada' }
  ]

  const { register, handleSubmit, watch, control } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: 'female',
      country: 'India',
      languagesKnown: [],
      currentlyWorking: true,
      perHourRate: 50
    }
  })

  const watchFields = watch()

  const submit = (data) => {
    console.log({ data })
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type='text'
              label='First Name'
              {...register('firstName')}
            />
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
              {...field}
            >
              {countries.map(country => <MenuItem key={country.id} value={country.name}>{country.name}</MenuItem>)}
            </Select>}
          />
        </Grid>
        <Grid>
          <FormControlLabel control={<Switch defaultChecked {...register('currentlyWorking')} />} label="Currently working" />
        </Grid>
        <Grid item xs={6}>
          <FormLabel>Please select your per hour rate</FormLabel>
          <Controller
            name='perHourRate'
            control={control}
            render={({ field }) => <Slider {...field} aria-label="Default" valueLabelDisplay="auto" />}
          />
          <FormLabel>${watchFields.perHourRate}</FormLabel>
        </Grid>
        <Button style={{ background: 'black', color: 'white' }} type='submit'>Submit</Button>
      </form>
    </Container>
  )
}
