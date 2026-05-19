import React from 'react'
import { AppState, Mode, Action } from "../Types";
import { X } from "../Translation";

import { Box, Typography, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { Grid, Container } from '@mui/material';

import { CmllTrainerView, OllcpTrainerView } from './CmllTrainerView';
import BlockTrainerView from './BlockTrainerView';
import PanoramaView from './PanoramaView';


import FavListView from './FavListView';
import TopBarView from './TopBarView';
import AnalyzerView from './AnalyzerView';

import Markdown from 'markdown-to-jsx';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

import { theme } from '../theme';

interface TabPanelProps {
  value: number,
  index: number,
  children: any,
  [key: string]: any
}
function TabPanel(props: TabPanelProps ) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  page: {
    backgroundColor: theme.palette.background.default
  },
  container: {
    display: "flex"
  },
  icon: {
    minWidth: 0
  },
  root: {
    display: "flex"
  },
  bar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  },
  select: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    borderRadius: 4,
    border: "1px solid " + theme.palette.background.default,
  }
}))

export const getTabModes = (): [Mode, string, string][] => [
  ["fb", X.MODES.FB.full, X.MODES.FB.short],
  ["analyzer", X.MODES.ANALYZER.full, X.MODES.ANALYZER.short],
  ["fs", X.MODES.FS.full, X.MODES.FS.short],
  ["fsdr", X.MODES.FSDR.full, X.MODES.FSDR.short],
  ["fbdr", X.MODES.FBDR.full, X.MODES.FBDR.short],
  ["fbss", X.MODES.FBSS.full, X.MODES.FBSS.short],
  ["ss", X.MODES.SS.full, X.MODES.SS.short],
  ["cmll", X.MODES.CMLL.full, X.MODES.CMLL.short],
  ["4c", X.MODES.LSE_4C.full, X.MODES.LSE_4C.short],
  ["eopair", X.MODES.EOLR.full, X.MODES.EOLR.short]
]

function _getInitialHashLocation() {
  const modes = getTabModes();
  const default_idx = modes.findIndex(x => x[0] === "fs")
  if (window.location.hash) {
    let idx = modes.findIndex(x => x[0] === window.location.hash.slice(1))
    if (idx === -1) {
      window.location.hash = "";
      return default_idx;
    } else {
      return idx;
    }
  } else {
    return default_idx
  }
}

function Intro() {
  return <Markdown>{X.INTRO.MARKDOWN}</Markdown>
}

// TODO: Write getter and setter for config items, and also write handlers that map to setters
function AppView(props: { state: AppState, dispatch: React.Dispatch<Action> } ) {
  //const [locations, setLocations] = React.useState([])
  let { state, dispatch } = props
  let classes = useStyles()

  const handleChange = React.useCallback( (newValue:number) => {
    if (newValue < getTabModes().length) {
      setValue(newValue)
      let mode = getTabModes()[newValue][0]
      dispatch({type: "mode", content: mode})
    }
  }, [dispatch])

  const [ open, setOpen ] = React.useState(false)

  const [value, setValue] = React.useState(_getInitialHashLocation());
  React.useEffect( () => {
    dispatch({type: "mode", content: getTabModes()[_getInitialHashLocation()][0]})
  }, [dispatch])

  React.useEffect(() => {
    const idx = getTabModes().findIndex(x => x[0] === state.mode);
    if (idx !== -1 && idx !== value) {
      setValue(idx);
      window.location.hash = state.mode;
    }
  }, [state.mode, value]);

  const handleInfoOpen = () => { setOpen(true) }
  const handleInfoClose = () => { setOpen(false) }

  const toggleBright = () => {
    const theme_flag = [...state.config.theme.flags]
    theme_flag[0] = 1 - theme_flag[0]
    theme_flag[1] = 1 - theme_flag[1]
    dispatch({ type: "config", content: {
      theme: state.config.theme.setFlags(theme_flag)
    }})
  }
  const toggleFav = () => {
    setFav(!showFav)
  }

  const [ showFav, setFav ] = React.useState(false)
  const createTabPanels = (elements: any[]) => {
    return <React.Fragment>
    {
      elements.map( (el, i) => <TabPanel key={i} value={value} index={i} className={classes.page}>{el}</TabPanel>)
    }
    </React.Fragment>
  }
  return (
    <main>
      <Dialog open={open} onClose={handleInfoClose}
        PaperProps={{sx: {borderRadius: 5, padding: 1}}}>
      <DialogContent dividers>
        <Intro></Intro>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleInfoClose}
          sx={{borderRadius: 10, textTransform: 'none'}}>
          {X.NAV.GOT_IT}
        </Button>
      </DialogActions>
      </Dialog>

      <TopBarView onChange={handleChange} value={value}
        handleInfoOpen={handleInfoOpen} toggleBright={toggleBright} toggleFav={toggleFav}
        toggleLanguage={() => dispatch({ type: "language", content: state.language === "zh" ? "en" : "zh" })}
        language={state.language}
      />

      <Box paddingY={2.5} paddingX={0}>
      <Container maxWidth={showFav ? "lg" : "md" }>

      {
      value === -1?
      (
      <Grid container className={classes.container} spacing={3}>
        <Grid item md={12} sm={12} xs={12}>
        <TabPanel value={value} index={4} className={classes.page}>
          <PanoramaView {...{state, dispatch}} />
        </TabPanel>
        </Grid>
      </Grid>
      )
      :
      (
      <Grid container className={classes.container} spacing={3}>
        <Grid item hidden={!showFav} md={4} sm={4} xs={12} >
        <FavListView {...{state, dispatch}} />
        </Grid>

        <Grid item md={showFav ? 8 : 12} sm={showFav ? 8 : 12} xs={12}>
        {
          createTabPanels([
            <BlockTrainerView {...{state, dispatch}} />, // fb
            <AnalyzerView {...{state, dispatch}} />,
            <BlockTrainerView {...{state, dispatch}} />, // fs
            <BlockTrainerView {...{state, dispatch}} />, // fsdr
            <BlockTrainerView {...{state, dispatch}} />, // fbdr
            <BlockTrainerView {...{state, dispatch}} />, // fbss
            <BlockTrainerView {...{state, dispatch}} />, // ss
            <CmllTrainerView {...{state, dispatch}} />,
            // <OllcpTrainerView {...{state, dispatch}} />,
            <BlockTrainerView {...{state, dispatch}} />,
            <BlockTrainerView {...{state, dispatch}} />,
            /*<TrackerView {...{state, dispatch}} /> */
          ])
        }

        </Grid>
      </Grid>
      )
      }
      </Container></Box>
    </main>
  )
}
export default AppView
