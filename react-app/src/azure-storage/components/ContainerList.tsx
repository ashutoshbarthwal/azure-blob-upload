import { ContainerItem } from '@azure/storage-blob';
import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { SharedViewStateContext } from '../contexts/viewStateContext';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import AllInboxIcon from '@material-ui/icons/AllInbox';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ContainerList: React.FC = () => {

  const classes = useStyles();
  const context = useContext(SharedViewStateContext);
  const [items, setItems] = useState<ContainerItem[]>([]);

  const getContainersEffect = () => {
    const sub = context.containers$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainersEffect, []);

  const onContainerClick = (name: string) => context.getContainerItems(name);

  return (
    <div className={classes.root}>
      {items.map((item, i) => (
        <div key={i}>
          <Chip  label={item.name} icon={<AllInboxIcon />}  variant="outlined" clickable onClick={() => onContainerClick(item.name)}/>
        </div>
      ))}
    </div>
  );
};

export default ContainerList;
