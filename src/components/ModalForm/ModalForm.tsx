import { Box } from "@mui/material";
import Title from "../title/Title";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ModalFormProps {
  title?: string,
  children?: React.ReactNode;
}

export default function ModalForm(props: ModalFormProps) {
  return(
    <Box sx={{ ...style, width: 400 }}>
    <Title>{props.title}</Title>
    {props.children}
  </Box>
  );
}