import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { Dispatch, SetStateAction } from 'react';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { Table } from '@mui/joy';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

function createData(
    date: string,
    type: string,
    quantity: number,
  ) {
    return { date, type, quantity};
  }

const rows = [
    createData('2024-05-01', 'import', 1),
    createData('2024-05-05', 'import', 2),
    createData('2024-05-02', 'export', 2),
  ];

export default function HistoryModal ({open, setOpen}: Props) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Manage History</DialogTitle>
          <DialogContent>Check and manage import/exit records</DialogContent>
          <Table sx={{width: '300px'}}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>type</th>
                    <th>quantity</th>
                </tr>
            </thead>
          <tbody>
            {rows.map((row, idx) => (
            <tr key={idx}>
                <td>{row.date}</td>
                <td>{row.type}</td>
                <td>{row.quantity}</td>
            </tr>
            ))}
          </tbody>
          </Table>
          
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>date</FormLabel>
                <Input autoFocus required type='date'/>
              </FormControl>
              <FormControl>
                <FormLabel>import / exit</FormLabel>
                <RadioGroup defaultValue="import">
                    <Radio value="import" label="import"/>
                    <Radio value="exit" label="exit"/>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>quantity</FormLabel>
                <Input autoFocus required type='number'/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    )
}