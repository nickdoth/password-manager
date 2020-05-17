import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import ArrowLeftIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'block',
      
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      transition: theme.transitions.create('width'),
      marginLeft: theme.spacing(1),
      width: '100%',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  }),
);

interface PageFrameProps {
  onSearch?: (kw: string) => void;
  onSave?: () => void;
  onAdd?: () => void;
  onBack?: () => void;
  title: string;
}

export const PageFrame: React.FC<PageFrameProps> = ({ children, onSearch, onSave, onBack, onAdd, title }) => {
  const classes = useStyles();
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (showSearch) {
      searchInputRef.current!.focus();
    }
  }, [ showSearch ]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {onBack ? <IconButton color="inherit" onClick={() => {
            onBack();
          }}>
            <ArrowLeftIcon />
          </IconButton> : null}
          
          {showSearch ? null : 
            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
          }
          <div className={classes.search} style={{ width: showSearch ? '100%' : '0%' }}>
            <InputBase
              placeholder="Search…"
              inputRef={searchInputRef}
              onBlur={(ev) => {
                if (ev.target.value.length > 0) {
                  return;
                }
                setShowSearch(false);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(ev) => onSearch?.(ev.target.value)}
            />
          </div>

          {onSearch ? <IconButton color="inherit" onClick={() => {
            setShowSearch(!showSearch);
          }}>
            {showSearch ? <CloseIcon /> : <SearchIcon />}
          </IconButton> : null}

          {onSave ? <IconButton color="inherit" onClick={() => {
            onSave();
          }}>
            <SaveIcon />
          </IconButton> : null}

          {onAdd ? <IconButton color="inherit" onClick={() => {
            onAdd();
          }}>
            <AddIcon />
          </IconButton> : null}
            
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}

export default PageFrame;