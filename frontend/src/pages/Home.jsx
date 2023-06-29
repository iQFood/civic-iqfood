import running from "../media/home-run.png";
import cherry from "../media/home-cherry.png";

export default function HomePage() {
  return (
    <>
      <div className="home-1">
        <div id="home-first-left">
            <h1 className="moto-text">
              lets make smarter and healthier food choices together
            </h1>
          <div id="story-div">
            <p>Just eat healthy or ill crawl from under your bed at night...</p>
          </div>
        </div>

        <div id="home-first-right">
            <img className="home-img" src={running}></img>
        </div>
      </div>
      <div div className="home-2">
        
      </div>
    </>
  );
}
