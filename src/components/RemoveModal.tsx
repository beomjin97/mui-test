import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { SetStateAction, Dispatch } from 'react';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function RemoveModal({open, setOpen}: Props) {

    return (
    <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
            <WarningRoundedIcon />
                Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>
                Are you sure you want to discard this part data?
            </DialogContent>
        <DialogActions>
            <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
            Discard
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
            Cancel
            </Button>
        </DialogActions>
        </ModalDialog>
  </Modal>
    )
}