import running from "../media/home-run.png";
import cherry from "../media/home-cherry.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function HomePage() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <div className="home-1">
        <div id="home-first-left">

          <h1 className="moto-text">
            Lets make smarter and healthier food choices together!
          </h1>
          {currentUser ? (false) : (
            <div>
            <NavLink className="home-1-butt" to="/login" end={true}>
              Login
            </NavLink>
            <NavLink className="home-1-butt" to="/sign-up" end={true}>
              Sign Up
            </NavLink>
          </div>
          )} 

        </div>

        <div id="home-first-right">
          <img className="home-img" src={running}></img>
        </div>
      </div>

      <div div className="home-2">
        <h1 className="home-2-text"> What is a NOVA Score</h1>

        <div id="home-2-div">
          <div id="home-page-2-desc">
            {" "}
            <h2 className="home-2-desc-text">
              The Nova Score is a ranking system that classifies foods based on
              their level of processing.
            </h2>
            <h2 className="home-2-desc-text">
              It helps people understand the degree of processing in food
              products so they can choose more nutritious options and be aware
              of the potential health effects of highly processed foods.
            </h2>
            <h2 className="home-2-desc-text">
              Ultra-processed foods, like packaged snacks and ready-to-eat
              meals, which are highly processed and often contain unhealthy
              additives, sugars, and fats.
            </h2>
          </div>

          <div id="home-page-2-list">
            <h2>The four classifications are:</h2>
            <ol id="home-nova-list">
              <li className="home-2-li">
                Unprocessed or minimally processed foods, like fruits,
                vegetables, and fresh meats, which are the healthiest choices.
              </li>
              <li className="home-2-li">
                Unprocessed or minimally processed foods, like fruits,
                vegetables, and fresh meats, which are the healthiest choices.
              </li>
              <li className="home-2-li">
                Processed culinary ingredients, such as oils, salt, and sugar,
                used in cooking and food preparation.
              </li>
              <li className="home-2-li">
                Processed foods, like canned vegetables or certain breads, which
                have undergone more processing and may have added ingredients.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div div className="home-3">
        <div id="home-3-left">
          <img className="home-img" src={cherry}></img>
        </div>

        <div id="home-3-right">
          <h1 className="moto-text">
            Lets make smarter and healthier food choices together!
          </h1>
        </div>
      </div>
    </>
  );
}
