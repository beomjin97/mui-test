import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Autocomplete from '@mui/joy/Autocomplete'
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useState } from 'react';
import { manufacturerArray } from '../data/manufacturer';
import { detailedTypeArray, partArray } from '../data/part';
import { locationArray } from '../data/location';
import { Part } from '../response/part';
import { modifyPart } from '../httpRequest';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    data: Part | undefined
}

export default function EditModal({open, setOpen, data}: Props) {

  const [formData, setFormData] = useState({
    manufacturer: data?.manufacturer,
    type: data?.type,
    detailedType: data?.detailedType,
    name: data?.name,
    number: data?.number,
    storageLocation: data?.storageLocation,
    detailedStorageLocation: data?.detailedStorageLocation
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    console.log(name, value)
    setFormData({...formData, [name]: value})

  }

  const handleInputChange = (e: SyntheticEvent<Element, Event>, value: any) => {
    console.log('trigger handle input change')
    console.log(e)
    //@ts-ignore
    const { id }: {id: string} = e.target;
    setFormData({...formData, [id.split('-')[0]]: value})

  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    if (data !== undefined) {
      modifyPart(data.id, formData)
        .then(() => alert('수정됨요'))
        .catch(() => alert('something wrong'))
    }
    console.log(formData);
  }
  
  return (
        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>edit part details</DialogTitle>
          <DialogContent>edit the information of this part.</DialogContent>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Manufacturer</FormLabel>
                <Autocomplete id='manufacturer' placeholder="Manufacturer" options={manufacturerArray} required onChange={handleInputChange} value={data?.manufacturer}/>
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Autocomplete id='type' placeholder="Type" options={partArray} required value={data?.type} onChange={handleInputChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Detailed Type</FormLabel>
                <Autocomplete id='detailedType' placeholder="Detailed Type" options={detailedTypeArray} required value={data?.detailedType} onChange={handleInputChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input name='name' required defaultValue={data?.name} onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>P/N</FormLabel>
                <Input id='number' required defaultValue={data?.number} onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>Place</FormLabel>
                <Autocomplete id='storageLocation' placeholder='Place' options={locationArray} value={data?.storageLocation} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Detailed Place</FormLabel>
                <Input name='detailedStorageLocation' defaultValue={data?.detailedStorageLocation} onChange={handleChange}/>
              </FormControl>
              <Button type="submit">Edit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    )
}