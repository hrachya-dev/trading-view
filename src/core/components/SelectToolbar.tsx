import React from 'react';
import { Box, Fab, Toolbar, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

interface SelectToolbarProps {
  onCancel: () => void;
  onDelete: (userIds: string[]) => void;
  processing: boolean;
  selected: string[];
}

function SelectToolbar({
  onCancel,
  onDelete,
  processing,
  selected,
}: SelectToolbarProps) {
  const { t } = useTranslation();

  const numSelected = selected.length;

  return (
    <Toolbar sx={{ ml: 1, px: { xs: 3, sm: 6 } }}>
      <Fab color="secondary" onClick={onCancel} variant="extended">
        <CloseIcon sx={{ mr: 1 }} />
        {numSelected} {t('common.selected')}
      </Fab>
      <Box sx={{ flexGrow: 1 }} />

      {numSelected > 0 && (
        <Tooltip title={t('common.delete') as string}>
          <Fab
            color="secondary"
            disabled={processing}
            onClick={() => onDelete(selected)}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default SelectToolbar;
