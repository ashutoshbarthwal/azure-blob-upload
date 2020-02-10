import { BlobItem } from '@azure/storage-blob';
import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import {
  DeletesViewStateContext,
  DownloadsViewStateContext,
  SharedViewStateContext
} from '../contexts/viewStateContext';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'left',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ItemsList: React.FC = () => {
  const sharedContext = useContext(SharedViewStateContext);
  const downloadsContext = useContext(DownloadsViewStateContext);
  const deletesContext = useContext(DeletesViewStateContext);
  const [items, setItems] = useState<BlobItem[]>([]);

  const getContainerItemsEffect = () => {
    const sub = sharedContext.itemsInContainer$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getContainerItemsEffect, []);
  const classes = useStyles();
  return (
    


    <div className={classes.root}>
          {items.map((item, i) => (
            <div key={i}>
              <Tooltip title={`${item.properties.contentLength} Bytes Last Modified : ${item.properties.lastModified.toISOString()}`} aria-label="add">
                  <Chip
                    label={item.name}
                    onClick={() => downloadsContext.downloadItem(item.name)}
                    onDelete={() => deletesContext.deleteItem(item.name)}
                    color="primary"
                  />
              </Tooltip>
            </div>
          ))}
        </div>
  );
};

export default ItemsList;
