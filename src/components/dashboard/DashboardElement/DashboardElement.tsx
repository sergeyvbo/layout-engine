import { Grid, GridSize, Paper } from "@mui/material";

interface DashboardElementProps {
  xs?: boolean | GridSize | undefined,
  md?: boolean | GridSize | undefined,
  lg?: boolean | GridSize | undefined,
  height?: number | undefined,
  children?: React.ReactNode;

}

export default function DashboardElement(props: DashboardElementProps) {
  return (
    <Grid item xs={props.xs} md={props.md} lg={props.lg}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: props.height,
        }}
      >
        {props.children}
      </Paper>
    </Grid>
  );
}