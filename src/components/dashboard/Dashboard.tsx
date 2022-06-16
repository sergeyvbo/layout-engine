import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LayersIcon from '@mui/icons-material/Layers';
// import { mainListItems, secondaryListItems } from '../../data/listItems';
import DashboardElement from './dashboardElement/DashboardElement';
import { fetchData } from '../../lib/utils';
import { ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Title from '../title/Title';
import ModalForm from '../modalForm/ModalForm';
import disability from "../../data/disability.json";
import disabilityPreview from "../../data/disabilityPreview.json";
import dispanserisationPreview from '../../data/dispanserisationPreview.json';
import clinicAttachment from '../../data/clinicAttachment.json';

import CardGroup from '../cardGroup/CardGroup';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 320;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [mainListItems, setMainListItems] = React.useState<JSX.Element[] | null>(null);
  const [secondaryListItems, setSecondaryListItems] = React.useState<JSX.Element[] | null>(null);
  const [sections, setSections] = React.useState<JSX.Element[] | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalFormData, setModalFormData] = React.useState<JSX.Element | null>(null);
  const [modalFormTitle, setModalFormTitle] = React.useState<string | undefined>(undefined);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function toggleModalForm(title?: string | undefined) {
    setModalFormTitle(title);
    setModalOpen(!modalOpen);
  }

  React.useEffect(() => {
    fetchData().then(data => {
      const mainItems = [];
      for (const view in data.generalMedicalPerspective.views) {
        const item = data.generalMedicalPerspective.views[view];
        mainItems.push(
          <ListItemButton key={item.id}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        );
      };

      const secondaryItems = [];
      const transitions = data.generalMedicalPerspective.views.dashboard.transitions;
      for (const t of transitions) {
        for (const prop of Object.keys(t)) {
          const item = t[prop];
          secondaryItems.push(<ListItemButton key={item.id} onClick={() => toggleModalForm(item.name)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
          );

        }
        const item = t[Object.keys(t)[0]];
      };

      const sectionItems = [];
      const sections = data.generalMedicalPerspective.views.dashboard.sections;
      for (const s in sections) {
        const item = data.generalMedicalPerspective.views.dashboard.sections[s];
        const entityName = Object.keys(item.entity)[0];
        const entity: any = item.entity[entityName];
        if (entityName == 'disablity') {
          sectionItems.push(
            <DashboardElement xs={12} md={8} lg={3} height={240} key={entity.id} onClick={() => toggleModalForm(entityName)}>
              <CardGroup title={disabilityPreview.title} items={disabilityPreview.items}/>
            </DashboardElement>
          );
        } else {
          sectionItems.push(
            <DashboardElement xs={12} md={8} lg={9} height={240} key={entity.id} onClick={() => toggleModalForm(entity.name)}>
              <Title>
                {entity.name}
              </Title>
              no data
            </DashboardElement>
          );
        }
      }
      sectionItems.push(
        <DashboardElement xs={12} md={8} lg={3} height={240} key={'dispanserisation'} onClick={() => toggleModalForm('dispanserisation')}>
          <CardGroup title={dispanserisationPreview.title} items={dispanserisationPreview.items}/>
        </DashboardElement>
      );
      sectionItems.push(
        <DashboardElement xs={12} md={8} lg={3} height={240} key={'clinicAttachment'} onClick={() => toggleModalForm('clinicAttachment')}>
          <CardGroup title={clinicAttachment.title} items={clinicAttachment.items}/>
        </DashboardElement>
      );

      setMainListItems(mainItems);
      setSecondaryListItems(secondaryItems);
      setSections(sectionItems);

    })
  }, []);

  function modalFormItems(title: string|undefined) {
    if (title == 'disablity') {
      return (
        <CardGroup title={title} items={disability.items}/>
      );
    }
    return <p>{title}</p>;
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Typography>views</Typography>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            <Typography>transitions</Typography>
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {sections}
              {/* <DashboardElement xs={12} md={4} lg={3} height={240}>
                <Deposits />
              </DashboardElement>

              <DashboardElement xs={12}>
                <Orders />
              </DashboardElement> */}


            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
        <Modal open={modalOpen} onClick={() => toggleModalForm(undefined)}>
          <ModalForm title={modalFormTitle}>
            {modalFormItems(modalFormTitle)}
          </ModalForm>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
