import { useTheme } from '@mui/material/styles';
import MainLogo from '../assets/images/applogo.png';

export default function Logo() {
  const theme = useTheme();

  return <img src={MainLogo} className="logo" />;
}
