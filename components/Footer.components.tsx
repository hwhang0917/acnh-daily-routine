export const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex flex-col items-center justify-center w-full py-5 backdrop-blur-sm bg-black bg-opacity-50">
      <div className="text-3xl">
        <a href="https://github.com/hwhang0917/acnh-daily-routine">
          <i className="fa-brands fa-github" />
        </a>
      </div>
      <div className="text-xs font-sans font-thin">
        <span>2022 &#169; Heesang Whang</span>
      </div>
    </footer>
  );
};
