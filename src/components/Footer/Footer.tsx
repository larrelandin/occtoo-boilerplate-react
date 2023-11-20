const Footer = () => {
return (
    <div className="fixed bottom-0 w-full bg-gray-200 p-2 overflow-hidden">
      <div className="max-h-4 text-xs transition-max-height duration-300 overflow-hidden hover:max-h-full hover:transition-none hover:duration-300">
        <span className="block">Disclaimer: This website is intended solely for demonstration purposes... -&gt;</span>
        <span className="block">All information, data, and content provided on this site are for illustrative and educational purposes only. The information presented here may be inaccurate, incomplete, or outdated. Users are advised to verify any information obtained from this website independently before relying on it for any purpose. The creators of this website do not guarantee the accuracy, reliability, or completeness of the information provided. Visitors are encouraged to use discretion and seek professional advice where necessary. By using this website, you agree that the creators shall not be held liable for any errors, inaccuracies, or damages arising from the use of the information provided herein.</span>
      </div>
    </div>
  );
};
export default Footer;
