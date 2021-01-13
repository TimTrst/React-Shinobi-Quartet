import React ,{ChangeEvent, useState} from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import {TextField, TableSortLabel,Grid,Hidden, Icon} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from "@material-ui/icons/Add";

import Shinobi from "../game/Shinobi";
import { boolean, number } from "yup/lib/locale";
import ConfirmDialog from "./ConfirmDialog";
import Form from "./Form";
import { Fab } from "./List.styles";

interface Props{
    shinobis: Shinobi[];
    onDelete: (id:number) => void;
    onSave: (shinobi: Shinobi) => void;
}

export default function List({ shinobis, onDelete, onSave}: Props){
    const [deleteDialog, setDeleteDialog] = useState<{open: boolean; id: number;}>({open: false, id: 0});
    const [formDialog, setFormDialog] = useState<{open: boolean; shinobi?: Shinobi;}>({ open: false});

    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState<{
        orderBy: keyof Shinobi;
        order: "asc" | "desc";
    }>({
        orderBy: "name",
        order: "asc",
    });

    const createSortHandler = (columnId: keyof Shinobi) => {
     return () => {
        setSort({
            orderBy: columnId,
            order: sort.order === "asc" ? "desc" : "asc",
        });
      };
    };

    return(
        <Grid container>
            <Hidden smDown>
                <Grid item md={1} />
            </Hidden>
         <Grid item xs={12} md={10}>
             <Paper>
              <TextField 
                   label="Liste filtern"
                   value={filter}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setFilter(e.currentTarget.value)}
              />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <TableSortLabel
                                active={sort.orderBy === "name"}
                                direction={sort.order}
                                onClick={createSortHandler("name")}
                            >
                                Name    
                            </TableSortLabel>    
                        </TableCell>
                        {(Object.keys(Shinobi.properties) as (keyof Shinobi)[]).map(property => (
                            <TableCell align="right" key={property}>
                                <TableSortLabel
                                    active={sort.orderBy === property}
                                    direction={sort.order}
                                    onClick={createSortHandler(property)}
                                    >
                                {Shinobi.properties[property].label}
                                {Shinobi.properties[property].unit !== "" && 
                                " (" + Shinobi.properties[property].unit + ")"}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell>{"delete"}</TableCell>
                        <TableCell>{"edit"}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shinobis.filter(shinobi => shinobi.name.toLowerCase().includes(filter.toLowerCase()))
                    .sort((shinobiA: Shinobi, shinobiB: Shinobi) => {
                        let result = 0;
                        if(shinobiA[sort.orderBy]! < shinobiB[sort.orderBy]!){
                            result = -1;
                        }
                        if(shinobiA[sort.orderBy]! > shinobiB[sort.orderBy]!){
                            result = 1;
                        }
                        return sort.order === "asc" ? result * -1 : result;
                    })
                    .map(shinobi => (
                        <TableRow key={shinobi.id}>
                            <TableCell>{shinobi.name}</TableCell>
                            {(Object.keys(Shinobi.properties) as (keyof Shinobi)[]).map(property => (
                                <TableCell key={property} align ="right">{shinobi[property]}</TableCell>
                            )
                        )}
                        <TableCell>
                            <IconButton onClick={() => { setDeleteDialog({open: true, id: shinobi.id! });}}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell>
                            <IconButton onClick={() => {setFormDialog({open: true, shinobi: shinobi})}}>
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </Paper>
            </Grid>
            <Hidden smDown>
                <Grid item md={1} />
            </Hidden>
            <ConfirmDialog 
                title="Wirklich löschen?"
                text="Möchten Sie das gewählte Element wirklich löschen?"
                open={deleteDialog.open}
                onClose={confirm => {
                    if(confirm){
                        onDelete(deleteDialog.id);
                    }
                    setDeleteDialog({
                        id:0,
                        open:false,
                    });
                }}
            />
            <Form 
                onSubmit={(shinobi: Shinobi) => {
                    setFormDialog(() => ({open: false}));
                    onSave(shinobi);
                }}
                shinobi={formDialog.shinobi}
                open={formDialog.open}
                onClose={() => setFormDialog(() => ({open: false}))}
            />
            <Fab
                color="primary"
                aria-label="Add"
                onClick={() => setFormDialog(() => ({open:true}))}
            >
                <AddIcon />
            </Fab>
        </Grid>
    );
}