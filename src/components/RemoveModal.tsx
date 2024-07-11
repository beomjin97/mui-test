import Button from '@mui/joy/Button';
import DialogActions from '@mui/joy/DialogActions';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { SetStateAction, Dispatch } from 'react';
import CommonModal from './CommonModal';
import { deletePart } from '../httpRequest';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    id: number;
}

export default function RemoveModal({open, setOpen, id}: Props) {

    return (
    <CommonModal 
        open={open} 
        setOpen={setOpen} 
        title={
                <>
                  <WarningRoundedIcon />
                  Confirmation
                </>
              } 
        content='Are you sure you want to discard this part data?'>
        <DialogActions>
            <Button variant="solid" color="danger" onClick={() => {
                setOpen(false)
                deletePart(id)
                    .then(() => alert('삭제요'))
                    .catch((err:unknown) => alert(err))
                }}>
            Discard
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
            Cancel
            </Button>
        </DialogActions>
    </CommonModal>
    )
}