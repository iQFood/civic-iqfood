import load from "../media/recipes.gif";

export default function LoadingPage(){
    return(
        <div id="load-page">
            <h1>Hold on!</h1>
            <img id="load-page-img" src={load}></img>
            <h1>We're cooking up this page :) </h1>
        </div>
    );
}