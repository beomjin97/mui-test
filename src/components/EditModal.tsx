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
import { Dispatch, SetStateAction } from 'react';
import { manufacturerArray } from '../data/manufacturer';
import { detailedTypeArray, partArray } from '../data/part';
import { locationArray } from '../data/location';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditModal({open, setOpen}: Props) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>edit part details</DialogTitle>
          <DialogContent>edit the information of this part.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Manufacturer</FormLabel>
                <Autocomplete placeholder="Manufacturer" options={manufacturerArray} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Autocomplete placeholder="Type" options={partArray} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Detailed Type</FormLabel>
                <Autocomplete placeholder="Detailed Type" options={detailedTypeArray} required/>
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>P/N</FormLabel>
                <Input required />
              </FormControl>
              <FormControl>
                <FormLabel>Place</FormLabel>
                <Autocomplete placeholder='Place' options={locationArray} />
              </FormControl>
              <FormControl>
                <FormLabel>Detailed Place</FormLabel>
                <Input />
              </FormControl>
              <Button type="submit">Edit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    )
}