import React, { Fragment } from 'react'

import {
    TextField,
    Divider,
    Button, Box,
    FormLabel, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';

import SettingsIcon from '@mui/icons-material/Settings';

import { AppState, Action } from '../Types';
import { ColorScheme } from '../lib/CubeLib';

import { MultiSelectContent } from './SelectorViews';
import { X } from '../Translation';

export function ColorSetter(props: {state: AppState, dispatch: React.Dispatch<Action>}) {
    const [text, setText] = React.useState(props.state.colorScheme.toUserInput().join(","))
    const handleChange = (event: any) => setText(event.target.value);
    const handleClick = () => {
        let arr = text.split(",")
        props.dispatch({
            type: "colorScheme",
            content: arr.length === 7? arr : ColorScheme.default_colors
        })
    }
    return (
        <Fragment>
        <Box marginBottom={1.5}>
        <TextField
            label={X.ANALYZER.COLOR}
            helperText={X.ANALYZER.COLOR_HELPER}
            onChange={handleChange}
            fullWidth
            value={text}
            size="small"
        /></Box>

        <Box>
        <Button variant="outlined" size="medium" color="primary" onClick={handleClick}
          sx={{borderRadius: 10, textTransform: 'none'}} >
            {X.ANALYZER.SET_COLOR}
        </Button>
        </Box>
        </Fragment>
    )
}

export function ColorPanel(props: {state: AppState, dispatch: React.Dispatch<Action>}) {
    let { state, dispatch } = props
    let select = "orientationSelector"
    let {content} = MultiSelectContent({state, dispatch, select})

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = (e: any, reason: string) => {
      if (reason === "backdropClick")
        setOpen(false);
    }

    return (
        <div className="color-panel">
        <FormLabel component="legend" sx={{ color: '#86868b', fontSize: '0.8125rem', fontWeight: 500 }}>{X.ANALYZER.ORI_AND_COLOR_SCHEME}</FormLabel>
        <Box height={8}/>
        <Button color="primary" variant="outlined"
          sx={{borderRadius: 10, textTransform: 'none', borderWidth: 1.5, '&:hover': {borderWidth: 1.5}}}
          onClick={handleClickOpen}>
        <SettingsIcon fontSize="small" color="primary" style={{marginLeft: -6, marginRight: 3}}></SettingsIcon>
          {X.COMMON.EDIT}
        </Button>
        <Box height={8}/>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}
          maxWidth="md" fullWidth
          PaperProps={{sx: {borderRadius: 5, padding: 2, maxWidth: '100%', boxSizing: 'border-box'}}}>
          <DialogTitle> {X.ANALYZER.FB_ORI_DIALOG_TITLE}  </DialogTitle>
          <DialogContent>
            {content}
            <Box height={16}/>
                <Divider />
            <Box height={16}/>
            <ColorSetter {...{state, dispatch}}/>

          </DialogContent>
          <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary"
                sx={{borderRadius: 10, textTransform: 'none'}}>
                  {X.COMMON.CLOSE}
              </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}
