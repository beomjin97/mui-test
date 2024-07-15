import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
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

export default function HistoryModal ({open, setOpen, histories, id}: Props) {

    const [formData, setFormData] = useState({
      isImport: true,
      date: new Date(),
      quantity: 0
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target
      if (name === 'isImport') {
        setFormData({
          ...formData,
          isImport : value === 'import'
        }) 
      } else if ( name==='quantity' ) {
        setFormData({
          ...formData,
          quantity: parseInt(value)
        })
      } else {
        setFormData({
          ...formData, 
          [name] : value
        })
      }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      //console.log(formData)
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
                <Input autoFocus required type='date' name='date' onChange={handleChange}/>
              </FormControl>
              <FormControl>
                <FormLabel>import / export</FormLabel>
                <RadioGroup defaultValue="import" name='isImport' onChange={handleChange}>
                    <Radio value="import" label="import"/>
                    <Radio value="export" label="exit"/>
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel>quantity</FormLabel>
                <Input autoFocus required type='number' name='quantity' onChange={handleChange}/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
      </CommonModal>
          
    )
}