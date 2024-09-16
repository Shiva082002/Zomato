// import {LINKEDIN_LINK} from "../common/constants";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By
      <span>❤️</span>
      {/* <a className="linkedin-name" href={LINKEDIN_LINK} target="_blank">
        Bharat Kumar
      </a> */}
      <span>&copy;</span>
      {year}
      <strong>
         <span></span>
      </strong>
    </div>
  );
};

export default Footer;
