import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import { DownloadsViewStateContext } from '../contexts/viewStateContext';
import { BlobItemDownload } from '../types/azure-storage';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
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

const ItemsDownloaded: React.FC = () => {
  const context = useContext(DownloadsViewStateContext);
  const [items, setItems] = useState<BlobItemDownload[]>([]);

  const getDownloadedItems = () => {
    const sub = context.downloadedItems$
      .pipe(tap(items => setItems(items)))
      .subscribe();

    return () => sub.unsubscribe();
  };
  useEffect(getDownloadedItems, []);
  const classes = useStyles();
  return (
    <div className="items-downloaded">
      <h3>Downloads</h3>

      {items.map((item, i) => (
        <div key={i}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.root}
              startIcon={<SaveIcon />}
              >
              {item.containerName}: {item.filename}
            </Button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ItemsDownloaded;
