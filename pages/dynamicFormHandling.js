import { Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'

export default function DynamicFormHandling() {

    const programmingLanguages = [
        { id: 1, name: 'Javascript' },
        { id: 2, name: 'Java' },
        { id: 3, name: 'Python' }
    ]

    const frameworks = {
        'Javascript': ['React', 'Angular', 'Vue'],
        'Java': ['Spring', 'Hibernate', 'JSF'],
        'Python': ['Django', 'Web2Py', 'Flask', 'Bottle']
    }

    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            languagesKnown: [],
        }
    })

    const watchFields = watch()

    const submit = (data) => {
        console.log({ data })
    }

    console.log({watchFields})
    return (
        <Container>
            <form onSubmit={handleSubmit(submit)}>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item xs={12}>
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
                    {
                        watchFields.languagesKnown?.map(lang => {
                            return <Grid item xs={6} key={lang}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{`Please select known frameworks in ${lang}`}</FormLabel>
                                    {frameworks[lang].map(fm => {
                                        return <FormControlLabel key={fm}
                                            control={
                                                <Checkbox
                                                    value={fm}
                                                    {...register(lang)} />
                                            }
                                            label={fm} />

                                    })}
                                </FormControl>
                            </Grid>
                        })
                    }
                </Grid>
                <Button style={{ background: 'black', color: 'white' }} type='submit'>Submit</Button>
            </form>
        </Container>
    )
}
