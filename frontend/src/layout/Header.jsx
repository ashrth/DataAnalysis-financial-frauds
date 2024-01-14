/* eslint-disable react/prop-types */
import { Typography } from "antd";
import { theme } from  "antd";

const {useToken} = theme;

const Header = ({ title, subtitle }) => {
  const token = useToken();

  return (
    <div className="mb-[30px]">
      <Typography variant="h2" color={token.colorFillSecondary} fontWeight="bold" sx={{ mb: "5px" }}>
        {title}
      </Typography>
      <Typography variant="h5" color={token.colorPrimary}>
        {subtitle}
      </Typography>
    </div>
  );
};
export default Header;
