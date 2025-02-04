import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const FeatureFilterSelectForm = ({ label, value, onChange, list }) => {
  const renderItems = () => {
    return list.map((item, index) => {
      return <MenuItem value={item?.value}>{item?.label}</MenuItem>;
    });
  };

  return (
    <FormControl>
      <Typography gutterBottom variant='h6'>
        {label}
      </Typography>
      <Select value={value} onChange={onChange} autoOk>
        {renderItems()}
      </Select>
    </FormControl>
  );
};
export default FeatureFilterSelectForm;
