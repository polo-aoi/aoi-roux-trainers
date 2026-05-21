import React, { Fragment } from 'react'

import CubeSim from './CubeSim'
import { Button, Typography, useTheme, FormControl, FormLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import FavoriteIcon from '@mui/icons-material/Favorite';
import useMediaQuery from '@mui/material/useMediaQuery';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import IconButton from '@mui/material/IconButton';


import { FaceletCube, Mask, MoveSeq } from '../lib/CubeLib';

import { AppState,  Action, FavCase, Mode} from "../Types";
import 'typeface-roboto-mono';
import { Face } from '../lib/Defs';

import { SingleSelect, MultiSelect, SliderSelect } from './SelectorViews';
import { ColorPanel } from './Input';
import { CaseDesc } from '../lib/Algs';
import { ScrambleInputView } from './ScrambleInputView';
import { CustomTooltip } from './Tooltip';
import { X } from '../Translation';
import { getInitialState } from '../reducers/InitialState';
import { StateFactory } from '../reducers/StateFactory';
import { BlockTrainerStateM } from '../reducers/BlockTrainerStateM';

const useStyles = makeStyles(theme => ({
    container: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(6),
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down(768)]: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(3),
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
    button: {
      width: "100%",
      height: 40,
      borderRadius: 6,
      fontSize: '0.9rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
      boxShadow: 'none',
      transition: 'all 0.15s ease',
      [theme.breakpoints.down(768)]: {
        height: 46,
        fontSize: '1rem',
        padding: '12px 24px',
        borderRadius: 6,
      },
    },
    paper: {
      padding: theme.spacing(2.5),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginBottom: 8,
      borderRadius: 6,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down(768)]: {
        padding: 12,
        marginBottom: 8,
      },
    },
    solutionPaper: {
      padding: theme.spacing(2.5),
      marginBottom: 8,
      borderRadius: 6,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down(768)]: {
        padding: 12,
        marginBottom: 8,
      },
    },
    buttonPaper: {
      padding: theme.spacing(2, 2.5),
      marginBottom: 8,
      borderRadius: 6,
      border: 'none',
      boxShadow: 'none',
      backgroundColor: 'transparent',
      [theme.breakpoints.down(768)]: {
        padding: 12,
      },
    },
    canvasPaper: {
      padding: theme.spacing(0),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    infoColumn: {
      color: theme.palette.background.paper
    },
    scrambleColumn: {
      paddingLeft: theme.spacing(3)
    },
    textColumn: {
      [theme.breakpoints.up('sm')]: {
        minHeight: 138
      },
    },
    setup: {
      whiteSpace: 'pre-line',
      fontSize: "1.35rem",
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: 1.55,
      color: theme.palette.text.primary,
      [theme.breakpoints.down('sm')]: {
      fontSize: "1.2rem",
      },
    },
    condGap: {
    },
    fgap: {
      flexShrink: 100, flexBasis: "2.5rem", minWidth: "1.5em",
      [theme.breakpoints.down('sm')]: {
        flexBasis: "1.0rem",
        minWidth: "0.4rem"
      }
    },
    fixedHeight: {
      height: 250,
    },
    title : {
        color: theme.palette.text.disabled,
        fontWeight: 500,
        fontSize: '0.7rem',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        paddingBottom: 4,
    },
    sourceIcon : {
        color: theme.palette.text.disabled,
        fontSize: 15,
        padding: 0
    },
    sourceIconWrap : {
    },
    fab: {
      position: 'absolute',
      top: theme.spacing(7),
      left: theme.spacing(2),
    },
    prompt: {
      color: theme.palette.text.secondary,
    },
    configPanel: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '28px 24px',
      [theme.breakpoints.down(768)]: {
        gridTemplateColumns: '1fr',
        gap: '14px',
      },
    },
    chainButton: {
      textTransform: 'none',
      fontSize: '0.725rem',
      fontWeight: 500,
      padding: '1px 6px',
      minWidth: 0,
      lineHeight: 1.5,
      borderRadius: 4,
      color: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(139,158,240,0.08)' : 'rgba(85,108,214,0.06)',
      },
    },
    formControlLabel: {
      [theme.breakpoints.down(768)]: {
        paddingTop: 4,
        paddingBottom: 4,
        '& .MuiFormControlLabel-label': {
          fontSize: '0.95rem',
        },
        '& .MuiRadio-root, & .MuiCheckbox-root': {
          padding: 12,
        },
      },
    },
    radioGroup: {
      [theme.breakpoints.down(768)]: {
        '& .MuiFormGroup-root': {
          flexDirection: 'column',
        },
      },
    },
    sectionLabel: {
      fontSize: '0.7rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: theme.palette.text.disabled,
      marginBottom: 2,
    },
  }))


function getMask(state: AppState) : Mask {
    if (state.mode === "fbdr") {
      const fbOnly = (state.case.desc.length === 0 || state.case.desc[0].kind === "fb")
      //   getActiveName(state.config.fbOnlySelector) === "FB Last Pair"
      return fbOnly ? Mask.fb_mask : Mask.fbdr_mask
    }
    else if (state.mode === "fs") {
      let name = state.config.fsSelector.getActiveName()
      return ({
        "Front FS": Mask.fs_front_mask,
        "Back FS": Mask.fs_back_mask,
        "Both": Mask.fb_mask
      } as any)[name]
    }
    else if (state.mode === "ss") {
      if (state.case.desc.length === 0) return Mask.sb_mask
      let name = state.config.ssSelector.getActiveName()
      let dpair = state.config.ssPairOnlySelector.getActiveName() === "D-Pair only"

      switch (name) {
        case "Front SS": return dpair ? Mask.ssdp_front_mask : Mask.ss_front_mask;
        case "Back SS": return dpair ? Mask.ssdp_back_mask : Mask.ss_back_mask;
        default : return dpair ? Mask.ssdp_both_mask : Mask.f2b_mask
      }
    }
    else if (state.mode === "fb") {
      if (state.case.desc.length === 0 || state.case.desc[0].kind === "fb" || state.case.desc[0].kind.startsWith("fb@")) {
        return Mask.fb_mask
      }
      else if (state.case.desc[0].kind === "fbdr") {
        return Mask.fbdr_mask
      } else {
        return Mask.solved_mask
      }
    }
    else if (state.mode === "fbss") {
      let name = state.config.fbssSsSelector.getActiveName()
      return ({
        "Front SS": Mask.ss_front_mask,
        "Back SS": Mask.ss_back_mask,
        "Both": Mask.f2b_mask
      } as any)[name]
    }
    else if (state.mode === "4c" || state.mode === "eopair") {
      return Mask.solved_mask
    }
    else return Mask.sb_mask
}

function BlockTrainerView(props: { state: AppState, dispatch: React.Dispatch<Action> } ) {
    let { state, dispatch } = props
    let cube = state.cube.state
    let classes = useStyles()

    let facelet = FaceletCube.from_cubie(cube, getMask(state))

    let desc : CaseDesc[] = state.case.desc.length ? state.case.desc :
       [ { algs: [""], setup: X.COMMON.NO_SOLUTION, id: "", kind: ""} ]

    let spaceButtonText = (state.name === "hiding") ? X.COMMON.REVEAL : X.COMMON.NEXT
    let showMoveCountHint = state.config.moveCountHint.getActiveName() === "Show"

    let describe_hide = (desc: CaseDesc[]) => {
      let minMove = desc.map( d =>
        d.algs.map(a => new MoveSeq(a).remove_setup().moves.length))
        .flat()
        .reduce( (a, b) => Math.min(a, b), 100 )
      return `(Min = ${minMove} STM)`
    }
    const handleSpace = () => {
      dispatch({type: "key", content: "#space"})
      if (state.name === "revealed") {
        setFav(false)
      }
    }

    const setup = desc.length ? desc[0].setup! : ""
    const showChainButtons = (state.mode === "fb" || state.mode === "fs" || state.mode === "fsdr" || state.mode === "fbdr")
      && (state.name === "revealed" || state.name === "revealed_all");
    const handleChainTrain = (alg: string) => {
      const currentOri = state.cube.ori;
      let targetMode: Mode;
      if (state.mode === "fb") {
        targetMode = "ss";
      } else if (state.mode === "fs" || state.mode === "fsdr") {
        const targetName = state.config.chainTargetSelector.getActiveName();
        targetMode = (targetName === "FBLP + SS") ? "fbss" : "fbdr";
      } else {
        // state.mode === "fbdr" → force jump to SS
        targetMode = "ss";
      }
      const newScramble = setup + " " + alg;
      dispatch({
        type: "custom",
        content: (state: AppState) => {
          let newState = getInitialState(targetMode);
          newState = { ...newState, scrambleInput: [newScramble] };
          const stateM = StateFactory.create(newState);
          let result = (stateM as BlockTrainerStateM)._updateCase();
          result.cube.ori = currentOri;
          return result;
        }
      });
    };
    const theme = useTheme()

    // source
    // Add event listeners
    React.useEffect(() => {
      function downHandler(event: KeyboardEvent) {
        if (event.key === " ") {
          const tag = (document.activeElement?.tagName || "").toLowerCase();
          if (tag === "input" || tag === "textarea") return;
          event.preventDefault();
          (document.activeElement as HTMLElement)?.blur();
        }
        if (event.key === " " && spaceButtonText === "Next") {
          setFav(false)
        }
        state.keyMapping.handle(event, dispatch);
      }
      window.addEventListener('keydown', downHandler);
      return () => {
        window.removeEventListener('keydown', downHandler);
      };
    });

    const [favSelected, setFav] = React.useState(false)
    const handleFav = () => {
      if (state.case.desc.length === 0) return
      const case_ : FavCase = {
        mode: state.mode,
        solver: state.case.desc.map(x => x.kind),
        setup: setup || ""
      }
      if (!favSelected){
        setFav(true)
        dispatch({type: "favList", content: [ case_ ], action: "add"})
      } else {
        setFav(false)
        dispatch({type: "favList", content: [ case_ ], action: "remove" })
      }
    }

    const gt_sm = useMediaQuery(theme.breakpoints.up('sm'));
    const canvas_wh = (gt_sm) ? [400, 350] : [320, 280]
    const ADD_STR = (gt_sm) ? X.COMMON.ADD : "";

    let levelSelectionWarning = X.LEVEL_FAIL_WARNING
    let levelSelectionSuccess = state.cube.levelSuccess

    const scramblePanel =
          <Box style={{display: "flex", flexWrap: "wrap", padding: 0, gap: 8, alignItems: "center"}}>
            <ScrambleInputView display = {setup}
                dispatch={dispatch} scrambles={state.scrambleInput}/>

            <Box>
            {
              gt_sm ?
              <Button variant="outlined"
                  color="primary"
                  size="small"
                  name="fav"
                  onClick={handleFav}
                  startIcon={<FavoriteIcon/>}
                  sx={{ borderRadius: 4, textTransform: 'none', fontWeight: 500 }}
                  >
                  {favSelected ? "✓" : ADD_STR}
              </Button>
              :
              null
            }
            </Box>
          </Box>

    return (
    <Box className={classes.container}>
      <Box className={classes.paper}>
        <Box style={{display: "flex"}}>
          <Box style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <Box className={classes.title}>
              {X.COMMON.SCRAMBLE}
            </Box>
            <Typography className={classes.setup} style={{marginTop: 4}}>
                  {setup}
            </Typography>
          </Box>
          <Box style={{}} className={classes.fgap} />

          {gt_sm && scramblePanel}
        </Box>
      </Box>

      <Box className={classes.solutionPaper}>
      <Grid container>

        <Grid item md={6} sm={12} xs={12} className={classes.condGap}>
          <Box style={{display: "flex" }}>
            <Box display="flex">
                <Box style={{display: "flex", alignSelf: "flex-start"}}> <Box className={classes.title}>
                  {X.COMMON.SOLUTIONS}
                </Box> </Box>
            </Box>
            <Box style={{}} className={classes.fgap} />
            <div>
              <Box paddingBottom={2} lineHeight={1}>
                {(state.name === "hiding") ? (
                  <Typography style={{whiteSpace: 'pre-line', fontSize: "1.15rem", fontWeight: 400, lineHeight: 1.6, color: theme.palette.text.secondary}}>
                    {showMoveCountHint ? describe_hide(desc) : ""}
                  </Typography>
                ) : (state.name === "revealed" || state.name === "revealed_all") ? (
                  desc.map((caseDesc, ci) => (
                    <Box key={ci}>
                      {desc.length > 1 && (
                        <Typography style={{fontWeight: 600, fontSize: "0.85rem", marginTop: ci > 0 ? 8 : 0, color: theme.palette.text.secondary}}>
                          [{caseDesc.kind}]:
                        </Typography>
                      )}
                      {caseDesc.algs.map((alg, ai) => (
                        <Box key={ai} style={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
                          <Typography style={{flex: 1, fontSize: "1.15rem", fontWeight: 400, lineHeight: 1.6}}>
                            {alg}
                          </Typography>
                          {showChainButtons && alg && (
                            <Button size="small" className={classes.chainButton}
                              onClick={() => handleChainTrain(alg)}>
                              {X.COMMON.CHAIN_PRACTICE}
                            </Button>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))
                ) : null}
              </Box>
            </div>
          </Box>
        </Grid>


        <Grid item md={6} sm={12} xs={12} style={{display: "flex", justifyContent: "center"}}>
          <Box style={{backgroundColor: "rgba(0, 0, 0, 0)"}}>
            { props.state.config.showCube.getActiveName() === "Show" ?
            <CubeSim
              width={canvas_wh[0]}
              height={canvas_wh[1]}
              cube={facelet}

              colorScheme={state.colorScheme.getColorsForOri(state.cube.ori)}
              hintDistance={ (state.mode === "4c" || state.mode === "eopair") ? 3 : 7 }
              theme={state.config.theme.getActiveName()}
              facesToReveal={ [Face.L, Face.B, Face.D]  }
              obscureNonLR={state.mode === "ss" && state.config.obscureNonLRSelector.getActiveName() === "On"}
              obscureStickerWidth={state.mode === "ss" ? state.config.obscureStickerWidthSelector.getActiveName() : undefined}
              obscureCornerMask={state.mode === "ss" && state.config.obscureCornerMaskSelector.getActiveName() === "On"}
            /> : null }
          </Box>
        </Grid>
      </Grid>
      </Box>

      <Box className={classes.buttonPaper}>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={3}>
          <Button onFocus={(evt) => evt.target.blur() } className={classes.button}
            variant="outlined" color="primary"
            onClick={handleSpace}>
              {spaceButtonText}
          </Button>
        </Grid>
        {
          !levelSelectionSuccess ?
          <Grid item xs={1}>
            <CustomTooltip title={levelSelectionWarning}>
              <IconButton>
                <ErrorOutlineIcon sx={{ fontSize: 28 }}/>
              </IconButton>
            </CustomTooltip>
          </Grid> :
          null
        }


      </Grid>

      </Box>

    </Box>
    );
}



export default BlockTrainerView
