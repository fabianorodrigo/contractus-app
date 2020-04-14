import {Theme, withStyles} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
export const ConteudoDialog = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
