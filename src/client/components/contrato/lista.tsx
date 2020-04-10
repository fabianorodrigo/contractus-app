import {Divider} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/EditTwoTone';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartTwoTone';
import React from 'react';
import {Contrato} from '../../../models';
import {getContratos} from '../../services/backend';
import useStyles from '../../services/styles';

export const ListaContratos: React.FC<{}> = ({}) => {
    const classes = useStyles();

    //Buscando contratos
    const [contratos, setContratos] = React.useState<Contrato[]>([]);
    React.useEffect(() => {
        getContratos().then((contratos) => {
            setContratos(contratos);
        });
    }, []);

    const avatarClasses = [classes.blueAvatar, classes.pinkAvatar, classes.greenAvatar];
    let indexAvatarClass = 0;
    return (
        <List className={classes.root}>
            {contratos.map((contrato) => {
                indexAvatarClass += 1;
                if (indexAvatarClass >= avatarClasses.length) {
                    indexAvatarClass = 0;
                }
                return (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar className={avatarClasses[indexAvatarClass]} alt={'numero do processo'}>
                                {'fornecedor.razaoSocial'.substr(0, 2)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={'fornecedor.nomeFantasia'}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {'contrato.numeroProcesso'}
                                    </Typography>
                                    {' - '.concat(contrato.dtInicioVigencia)}
                                    <Table className={classes.table} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Indicador</TableCell>
                                                <TableCell>Escopo</TableCell>
                                                <TableCell>Descrição</TableCell>
                                                <TableCell>Linguagem</TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow key={'row.nome'}>
                                                <TableCell component="th" scope="row">
                                                    {'row.nome'}
                                                </TableCell>
                                                <TableCell align="center">{'row.escopo'}</TableCell>
                                                <TableCell>{'row.descricao'}</TableCell>
                                                <TableCell>{'row.linguagemExecucao'}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </React.Fragment>
                            }
                        />
                        <Divider variant="middle" />

                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="Editar">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="Ver Ordens de Serviço">
                                <ShoppingCartIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};
