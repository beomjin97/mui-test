import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { Table } from '@mui/joy';
import { History } from '../response/part';
import CommonModal from './CommonModal';
import { addHistory } from '../httpRequest';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    histories: Array<History> | undefined
    id: number
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
    createData('2024-05-02', 'import', 2),
    createData('2024-05-05', 'export', 2),
  ];

export default function HistoryModal ({open, setOpen, histories, id}: Props) {

    const [formData, setFormData] = useState({
      isImport: true,
      date: new Date(),
      quantity: 0
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
      setFormData({
        ...formData, 
        [name] : value
      })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      addHistory(id, formData)
      setOpen(false);
    }

    return (
      <CommonModal open={open} setOpen={setOpen} title='Manage History' content='Check and manage import/exit records'>
        <Table sx={{width: '300px'}}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>type</th>
                    <th>quantity</th>
                </tr>
            </thead>
          <tbody>
            {histories?.map((row, idx) => (
            <tr key={idx}>
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>{row.isImport ? 'import' : 'export'}</td>
                <td>{row.quantity}</td>
            </tr>
            ))}
          </tbody>
          </Table>
          
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>date</FormLabel>
                <Input autoFocus required type='date' onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>import / exit</FormLabel>
                <RadioGroup defaultValue="import" onChange={handleChange}>
                    <Radio value="import" label="import"/>
                    <Radio value="exit" label="exit"/>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>quantity</FormLabel>
                <Input autoFocus required type='number' onChange={handleChange}/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
      </CommonModal>
          
    )
}