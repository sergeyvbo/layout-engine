import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CardContent from '@mui/material/CardContent';

const DEFAULT_WIDTH: number = 4;

export interface IBasicCardProps {
    data: IBasicCardPropsData,
    metadata?: IBasicCardPropsMetadata
};

export interface IBasicCardPropsData {
    header: string,
    content: string
};

export interface IBasicCardPropsMetadata {
    xs: number
};

export default function BasicCard({data, metadata}: IBasicCardProps): any {
    return (
        <Grid item xs={metadata?.xs || DEFAULT_WIDTH}>
        <Card >
        <CardContent sx={{ padding: "0.5rem" }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {data.header}
            </Typography>
            <Typography variant="h6" >
                {data.content}
            </Typography>
        </CardContent>
        </Card>
        </Grid>
    );
};
