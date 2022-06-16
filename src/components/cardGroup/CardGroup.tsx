import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import {IBasicCardProps} from "./BasicCard";
import BasicCard from "./BasicCard";

export interface ICardGroupProps {
  title: string,
  items: IBasicCardProps[]
}

const CardGroup = ({title, items}: ICardGroupProps) => {
  return (
    <div>
      <Box display="flex"  
        alignItems="center"
        justifyContent="center"
        bgcolor="#FEDA5A"
        width='100%'
        marginBottom="0.5rem"
        >
        <Typography variant="h4" component="div">
          {title}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {items.map(item => <BasicCard {...item} />)} 
      </Grid>
      </div>
  );
}

export default CardGroup;