import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Autocomplete from '@mui/joy/Autocomplete'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useState } from 'react';
import { manufacturerArray } from '../data/manufacturer';
import { detailedTypeArray, partArray } from '../data/part';
import { locationArray } from '../data/location';
import { createNewPart } from '../httpRequest';
import CommonModal from './CommonModal';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddModal({open, setOpen}: Props) {

    const [formData, setFormData] = useState({
      name: '',
      type: '',
      manufacturer: '',
      storageLocation: '',
      date: new Date(),
      quantity: 0,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      if (name === 'quantity') {
          setFormData({...formData, [name]: parseInt(value)})
      } else {
          setFormData({...formData, [name]: value})   
      }   
    }

    const handleInputChange = (e: SyntheticEvent<Element, Event>, value: string) => {
      //@ts-ignore
      const { id }: {id: string} = e.target;
      setFormData({...formData, [id.split('-')[0]]: value})
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setOpen(false);
      console.log(formData)
      createNewPart(formData)
        .then(() => alert('등록됨요'))
        .catch((err:unknown) => alert(err))
    }
 
    return (
      <CommonModal open={open} setOpen={setOpen} title='Add new Part' content='Add new Part Data.'>
        <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Manufacturer</FormLabel>
                <Autocomplete placeholder="Manufacturer" id='manufacturer' required options={manufacturerArray} onInputChange={handleInputChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Autocomplete placeholder="Type" id='type' options={partArray} required onInputChange={handleInputChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Detailed Type</FormLabel>
                <Autocomplete placeholder="Detailed Type" id='detailedType' options={detailedTypeArray} onInputChange={handleInputChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name='name' required onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>P/N</FormLabel>
                <Input name='number'onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Place</FormLabel>
                <Autocomplete placeholder='Place' required id='storageLocation' options={locationArray} onInputChange={handleInputChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Detailed Place</FormLabel>
                <Input name='detailedStorageLocation' onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input type='number' required name='quantity' onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input type='date' required name='date' onChange={handleChange}/>
              </FormControl>
              <Button type="submit">Add</Button>
            </Stack>
          </form>
      </CommonModal>
          
    )
}