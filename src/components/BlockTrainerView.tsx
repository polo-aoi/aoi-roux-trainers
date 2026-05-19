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
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
      transition: "all .3s ease-in-out",
      [theme.breakpoints.down(768)]: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(3),
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
    button: {
      width: "100%",
      height: 52,
      borderRadius: 14,
      fontSize: '1.05rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      boxShadow: '0 2px 12px rgba(85,108,214,0.25)',
      transition: 'all 0.2s ease',
      '&:active': {
        transform: 'scale(0.98)',
      },
      [theme.breakpoints.down(768)]: {
        height: 56,
        fontSize: '1.15rem',
        padding: '14px 24px',
        borderRadius: 16,
      },
    },
    paper: {
      padding: theme.spacing(2.5),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginBottom: 14,
      borderRadius: 18,
      border: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
      boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.04)',
      [theme.breakpoints.down(768)]: {
        padding: 12,
        marginBottom: 10,
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
      fontSize: "1.5rem",
      fontWeight: 500,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      [theme.breakpoints.down('sm')]: {
      fontSize: "1.25rem",
      fontWeight: 500
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
        color: theme.palette.text.secondary,
        fontWeight: 600,
        fontSize: '0.7rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        paddingBottom: 4,
        borderBottom: 'none',
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
      gap: '24px',
      [theme.breakpoints.down(768)]: {
        gridTemplateColumns: '1fr',
        gap: '12px',
      },
    },
    chainButton: {
      textTransform: 'none',
      fontSize: '0.75rem',
      fontWeight: 500,
      padding: '1px 8px',
      minWidth: 0,
      lineHeight: 1.6,
      borderRadius: 8,
      color: theme.palette.text.disabled,
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(85,108,214,0.1)' : 'rgba(85,108,214,0.06)',
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

function getHelperTextForMode(mode: Mode) {
  if (mode === "4c" || mode === "eopair") {
    return X.LSE.USAGE
  } else {
    return null
  }
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
    const showChainButtons = (state.mode === "fs" || state.mode === "fsdr" || state.mode === "fbdr")
      && (state.name === "revealed" || state.name === "revealed_all");
    const handleChainTrain = (alg: string) => {
      let targetMode: Mode;
      if (state.mode === "fs" || state.mode === "fsdr") {
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
          return (stateM as BlockTrainerStateM)._updateCase();
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

    // helper-text
    let helperText = getHelperTextForMode(state.mode)

    let levelSelectionWarning = X.LEVEL_FAIL_WARNING
    let levelSelectionSuccess = state.cube.levelSuccess

    const scramblePanel =
          <Box style={{display: "flex", flexWrap: "wrap", padding: 0}}>
            <ScrambleInputView display = {setup}
                dispatch={dispatch} scrambles={state.scrambleInput}/>

            <Box>
            {
              gt_sm ?
              <Button variant={favSelected ? "contained" : "outlined"}
                  color="primary"
                  size="small"
                  name="fav"
                  onClick={handleFav}
                  startIcon={<FavoriteIcon/>}
                  >
                  {favSelected ? "✓" : ADD_STR}
              </Button>
              :
              null
              // <Button variant={favSelected ? "contained" : "outlined"}
              //     color="primary"
              //     size="small"
              //     name="fav"
              //     onClick={handleFav}
              // >
              //   <Box marginTop={0.5}>
              //     <FavoriteIcon fontSize="small"/>
              //   </Box>
              // </Button>
            }
            </Box>
          </Box>

    return (
    <Box className={classes.container}>
      <Paper className={classes.paper}>
        <Box style={{display: "flex"}}>
          <Box style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box className={classes.title} style={{}}>
              {X.COMMON.SCRAMBLE}
            </Box>
          </Box>
          <Box style={{}} className={classes.fgap} />
          <Box style={{display: "flex", alignItems: "center", flexGrow: 1}}>
            <Typography className={classes.setup} >
                  {setup}
            </Typography>
          </Box>
          <Box style={{}} className={classes.fgap} />

          {gt_sm && scramblePanel}


        </Box>
      </Paper>

      <Paper className={ classes.paper}>
      <Grid container>

        <Grid item md={6} sm={12} xs={12} className={classes.condGap}>
          <Box style={{display: "flex" }}>
            <Box display="flex" >
                <Box style={{display: "flex", alignSelf: "flex-start"}}> <Box className={classes.title} style={{}}>
                  {X.COMMON.SOLUTIONS}
                </Box> </Box>
            </Box>
            <Box style={{}} className={classes.fgap} />
            <div>
              <Box paddingBottom={2} lineHeight={1}>
                {(state.name === "hiding") ? (
                  <Typography style={{whiteSpace: 'pre-line', fontSize: "1.2rem"}}>
                    {showMoveCountHint ? describe_hide(desc) : ""}
                  </Typography>
                ) : (state.name === "revealed" || state.name === "revealed_all") ? (
                  desc.map((caseDesc, ci) => (
                    <Box key={ci}>
                      {desc.length > 1 && (
                        <Typography style={{fontWeight: 600, fontSize: "0.9rem", marginTop: ci > 0 ? 8 : 0}}>
                          [{caseDesc.kind}]:
                        </Typography>
                      )}
                      {caseDesc.algs.map((alg, ai) => (
                        <Box key={ai} style={{display: 'flex', alignItems: 'center', marginBottom: 2}}>
                          <Typography style={{flex: 1, fontSize: "1.2rem"}}>
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
      </Paper>

      <Paper className={classes.paper} style={{paddingTop: 22, paddingBottom: 22}}>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={3} marginLeft={1}>
          <Button onFocus={(evt) => evt.target.blur() } className={classes.button}
            size="large" variant="contained" color="primary"
            onClick={handleSpace}>
              {spaceButtonText}
          </Button>
        </Grid>
        {
          !levelSelectionSuccess ?
          <Grid item xs={1} marginLeft={1}>
            <CustomTooltip title={levelSelectionWarning}>
              <IconButton>
                <ErrorOutlineIcon sx={{ fontSize: 30 }}/>
              </IconButton>
            </CustomTooltip>
          </Grid> :
          null
        }


      </Grid>

      </Paper>

      <Box height={28}/>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ConfigPanelGroup {...{state, dispatch, classes} } />
      </Box>

      {helperText ?
      <Fragment>
        <Box height={28}/>
        <Box sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 16,
          padding: 3,
          border: '1px solid ' + (theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
        }}>
        <FormControl component="fieldset" className={classes.prompt}>
          <FormLabel component="legend">
            <pre style={{ fontFamily: 'inherit', lineHeight: 1.6 }}>
              {helperText}
            </pre>
          </FormLabel>
          </FormControl>
        </Box>
      </Fragment> : null }
    </Box>
    );
}



function ConfigPanelGroup(props: {state: AppState, dispatch: React.Dispatch<Action>, classes: any }) {
  let { state, dispatch, classes } = props
  if (state.mode === "ss") {
    let DRManip = [
      // names: ["UF", "FU", "UL", "LU", "UB", "BU", "UR", "RU", "DF", "FD", "DB", "BD",
      // "DR", "RD", "BR", "RB", "FR", "RF"],
      { name: X.LEVEL_SELECT.TOGGLE_SELECT_ALL, enableIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
      { name: X.LEVEL_SELECT.TOGGLE_ALL_ORIENTED, enableIdx: [0, 2, 4, 6, 8, 10, 12, 14, 16] },
    ]
    return (
      <Fragment>
      <SliderSelect {...{state, dispatch, select: "ssLevelSelector"}} />

      <Box className={classes.configPanel}>
        <SingleSelect {...{state, dispatch, select: "ssSelector"}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: "ssPairOnlySelector"}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: "solutionNumSelector"}}> </SingleSelect>
        {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}

        <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: "showCube"}}> </SingleSelect>

        <Box>
          <SingleSelect {...{state, dispatch, select: "obscureNonLRSelector"}}> </SingleSelect>
          {state.config.obscureNonLRSelector.getActiveName() === "On" &&
            <SingleSelect {...{state, dispatch, select: "obscureStickerWidthSelector"}}> </SingleSelect>
          }
          {state.config.obscureNonLRSelector.getActiveName() === "On" &&
            <SingleSelect {...{state, dispatch, select: "obscureCornerMaskSelector"}}> </SingleSelect>
          }
        </Box>

        <MultiSelect {...{state, dispatch, select: "ssPosSelector", options: {manipulators: DRManip} }}> </MultiSelect>
        <ColorPanel {...{state, dispatch}} />
      </Box>

      </Fragment>
    )
  } else if (state.mode === "fbdr") {
    let select1 = "fbdrSelector"
    let select2 = "fbOnlySelector"
    let select3 = "fbPairSolvedSelector"
    let select4 = "fbdrScrambleSelector"
    let select5 = "solutionNumSelector"

    let LPEdgeManip = [
      { name: X.LEVEL_SELECT.TOGGLE_SELECT_ALL, enableIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
    ]
    let pos1 = "fbdrPosSelector1"
    let pos3 = "fbdrPosSelector3"

    return (
      <Fragment>
      <SliderSelect {...{state, dispatch, select: "fbdrLevelSelector"}} />

      <Box className={classes.configPanel}>
        <SingleSelect {...{state, dispatch, select: select2}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: select1}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: select3}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: select4}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: select5}}> </SingleSelect>
        {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
        <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
        <SingleSelect {...{state, dispatch, select: "showCube"}}> </SingleSelect>

        <MultiSelect {...{state, dispatch, select: pos1, options: {manipulators: LPEdgeManip} }}> </MultiSelect>
        <MultiSelect {...{state, dispatch, select: pos3, options: {manipulators: LPEdgeManip} }}> </MultiSelect>
        <ColorPanel {...{state, dispatch}} />
      </Box>

      </Fragment>
    )
  } else if (state.mode === "fb") {
    return (
      <Fragment>
        <SliderSelect {...{state, dispatch, select: "fbLevelSelector"}} />
        {/* <SingleSelect {...{state, dispatch, select: "fbStratSelector"}} />  */}

        <Box className={classes.configPanel}>
          <SingleSelect {...{ state, dispatch, select: "fbPieceSolvedSelector" }}> </SingleSelect>
          {/* <SingleSelect {...{state, dispatch, select: "fbBasisSelector"}} />  */}
          <SingleSelect {...{ state, dispatch, select: "solutionNumSelector"}}> </SingleSelect>
        {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
          <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
          <SingleSelect {...{state, dispatch, select: "showCube"}}> </SingleSelect>

          <ColorPanel {...{state, dispatch}} />
        </Box>

      </Fragment>
    )
   } else if (state.mode === "fs") {
    let select1 = "fsSelector"
    let select2 = "solutionNumSelector"

    return (
      <Fragment>
        <SliderSelect {...{state, dispatch, select: "fsLevelSelector"}} />

        <Box className={classes.configPanel}>
          <SingleSelect {...{ state, dispatch, select: select1 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select2 }}> </SingleSelect>
          {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
          <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
          <SingleSelect {...{state, dispatch, select: "showCube" }}> </SingleSelect>

          <SingleSelect {...{state, dispatch, select: "chainTargetSelector"}}> </SingleSelect>

          <ColorPanel {...{state, dispatch}} />
        </Box>

      </Fragment>
    )
   } else if (state.mode === "fsdr") {
    let select1 = "fsSelector"
    let select2 = "solutionNumSelector"

    return (
      <Fragment>
        <SliderSelect {...{state, dispatch, select: "fsLevelSelector"}} />

        <Box className={classes.configPanel}>
          <SingleSelect {...{ state, dispatch, select: select1 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select2 }}> </SingleSelect>
          {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
          <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
          <SingleSelect {...{state, dispatch, select: "showCube" }}> </SingleSelect>

          <SingleSelect {...{state, dispatch, select: "chainTargetSelector"}}> </SingleSelect>

          <ColorPanel {...{state, dispatch}} />
        </Box>

      </Fragment>
    )
   }
   else if (state.mode === "fbss") {
    let select1 = "fbssLpSelector"
    let select2 = "fbssSsSelector"
    let select3 = "solutionNumSelector"

    return (
      <Fragment>
        <SliderSelect {...{state, dispatch, select: "fbssLevelSelector"}} />
        <Box className={classes.configPanel}>
          <SingleSelect {...{ state, dispatch, select: select1 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select2 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select3 }}> </SingleSelect>
          {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
          <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
          <ColorPanel {...{state, dispatch}} />
        </Box>

      </Fragment>
    )
   }
   else if (state.mode === "4c"){
    let select1 = "lseStageSelector"
    let select2 = "lseMCSelector"
    let select3 = "lseBarSelector"
    let select4 = "solutionNumSelector"

    return (
      <Fragment>
        <Box className={classes.configPanel}>
          <SingleSelect {...{ state, dispatch, select: select1 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select2 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select3 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select4 }}> </SingleSelect>
          {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
          <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
          <SingleSelect {...{state, dispatch, select: "showCube"}}> </SingleSelect>

          <ColorPanel {...{state, dispatch}} />
        </Box>
      </Fragment>
    )
   } else if (state.mode === "eopair"){
    let select1 = "lseEOSelector"
    let select2 = "lseEOLRMCSelector"
    let select3 = "lseBarbieSelector"
    let select4 = "lseEOLRScrambleSelector"
    let select5 = "solutionNumSelector"

    return (
      <Fragment>
        <Box className={classes.configPanel}>
          <MultiSelect {...{ state, dispatch, select: select1, options: {noDialog: true}} }> </MultiSelect>
          <SingleSelect {...{ state, dispatch, select: select2 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select3 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select4 }}> </SingleSelect>
          <SingleSelect {...{ state, dispatch, select: select5 }}> </SingleSelect>
          {/* <SingleSelect {...{state, dispatch, select: "evaluator"}}> </SingleSelect> */}
          <SingleSelect {...{state, dispatch, select: "moveCountHint"}}> </SingleSelect>
          <SingleSelect {...{state, dispatch, select: "showCube"}}> </SingleSelect>

          <ColorPanel {...{state, dispatch}} />
        </Box>
      </Fragment>
    )
   }
   else return <Fragment/>
}



export default BlockTrainerView
