
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By
      <span>Shivansh Yadav-2021kucp1019-IIIT kota</span>
      <span>&copy;</span>
      {year}
      <strong>
         <span></span>
      </strong>
    </div>
  );
};

export default Footer;
