import Hero from "./Hero";
import HomeFeed from "./HomeFeed";
import LoggedOutHeader from "./LoggedOutHeader";

function LoggedOutHomepage() {
  // tailwind doesn't support dynamic classes so have to do it like this
  const headerStyles = {
    height: "h-[75px]",
    top: "top-[75px]",
    negativeTop: "-top-[75px]",
  };

  return (
    <>
      <LoggedOutHeader
        height={headerStyles.height}
        negativeTop={headerStyles.negativeTop}
      />

      <main>
        <Hero />
        <HomeFeed headerTop={headerStyles.top} />
      </main>
    </>
  );
}

export default LoggedOutHomepage;
