import running from "../media/home-run.png";
import cherry from "../media/home-cherry.png";

export default function HomePage() {
  return (
    <>
      <div className="home-1">
        <div id="home-first-left">
          <h1 className="moto-text">
            Lets make smarter and healthier food choices together!
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
        <h1> What is a NOVA Score</h1>
        <h2>
          The Nova Score is a system that classifies foods based on their level
          of processing.
          <br /> It has four categories:
        </h2>
        <ol id="home-nova-list">
          <li>
            Unprocessed or minimally processed foods, like fruits, vegetables,
            and fresh meats, which are the healthiest choices.
          </li>
          <li>
            Unprocessed or minimally processed foods, like fruits, vegetables,
            and fresh meats, which are the healthiest choices.
          </li>
          <li>
            Processed culinary ingredients, such as oils, salt, and sugar, used
            in cooking and food preparation.
          </li>
          <li>
            Processed foods, like canned vegetables or certain breads, which
            have undergone more processing and may have added ingredients.
          </li>
        </ol>
        
        <h3>
        Ultra-processed foods, like packaged snacks and ready-to-eat meals, which are highly processed and often contain unhealthy additives, sugars, and fats. 
        </h3>
        The Nova Score helps people understand the degree of processing in a food product so they can choose more nutritious options and be aware of the potential health effects of highly processed foods.

      </div>

      <div div className="home-3">
        <h1>[Lorem Ipsum]</h1>
      </div>
    </>
  );
}
