import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import generalMedicalPerscriptive from '../data/generalMedicalPerspective.json';
import { Resolver } from '@stoplight/json-ref-resolver';

const resolver = new Resolver();
const data = resolver.resolve(generalMedicalPerscriptive);

export const mainListItems = (
  <React.Fragment>
    {Object.keys(generalMedicalPerscriptive.generalMedicalPerspective.views).map(key => {
      return(
        <ListItemButton key={key}>
          <ListItemIcon>
          <LayersIcon />
          </ListItemIcon>
          <ListItemText primary={key} />
        </ListItemButton>
      );
    })}
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Transitions
    </ListSubheader>
    {generalMedicalPerscriptive.generalMedicalPerspective.views.dashboard.transitions.map(t => {
      const key = Object.keys(t) && Object.keys(t)[0];
      return(<ListItemButton key = {key}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={key} />
      </ListItemButton>  
      );
    })}
  </React.Fragment>
);
