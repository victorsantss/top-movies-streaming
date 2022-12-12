import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import { getWatchProviders } from "../services/getWatchProviders";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function WatchProvidersFilter() {
  const [watchProviders, setWatchProviders] = useState([]);

  const getWatchProviderOptions = async () => {
    const data = await getWatchProviders();
    setWatchProviders(data);
  };

  const [providerName, setProviderName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof providerName>) => {
    const {
      target: { value },
    } = event;
    setProviderName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClear = () => {
    setProviderName([]);
  }

  useEffect(() => {
    getWatchProviderOptions();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <FormControl sx={{ m: 1, width: 800 }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter by provider</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={providerName}
          onChange={handleChange}
          input={<OutlinedInput label="Filter by provider" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {watchProviders.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={providerName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        onClick={handleClear}
        startIcon={<DeleteIcon />}
        size="large"
        sx={{
          width: 300,
          height: 56,
        }}
      >Clear Filters</Button>
    </Box >
  )
}