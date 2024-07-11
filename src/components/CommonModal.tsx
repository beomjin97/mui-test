import { Dispatch, ReactNode, SetStateAction } from "react";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode
    title: string | ReactNode;
    content?: string;
}

export default function CommonModal ({open, setOpen, children, title, content}: Props) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog>
                <DialogTitle>{title}</DialogTitle>
                {content ?? <DialogContent>{content}</DialogContent>}
                {children}
            </ModalDialog>
        </Modal>
    )
}